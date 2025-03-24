import { defineStore } from "pinia";
import router from "../router";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { RESET_USER_DATA } from "./resetStore";

const USER_API_URLS = [
  "https://tmdb-backend.herokuapp.com/api/user",
  "https://tmdb-backend.autoidleapp.com/api/user",
];

const QUEUE_API_URLS = [
  "https://tmdb-backend.herokuapp.com/api/approve-user",
  "https://tmdb-backend.autoidleapp.com/api/approve-user",
];

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    permissions: {},
    deleteAccountResults: { result: "", message: "" },
    updatePasswordResults: { result: "", message: "" },
    isLoading: false,

    admin: {
      queue: [],
    },
  }),
  persist: true,
  actions: {
    async login({ email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        this.user = auth.currentUser;
        await this.getUserPerms(this.user.uid);
        router.push({ name: "Home" });
      } catch {
        return { success: false, message: "Invalid email or password" };
      }
    },

    async register({ email, password }) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json", uid: user.uid },
        };
        await this.manageUserWithDB(options);

        this.user = auth.currentUser;
        await this.getUserPerms(user.uid);
        router.push({ name: "Home" });
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    async googleSignIn() {
      try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        if (getAdditionalUserInfo(res).isNewUser) {
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", uid: res.user.uid },
          };
          await this.manageUserWithDB(options);
        }
        this.user = res.user;
        await this.getUserPerms(res.user.uid);
        router.push({ name: "Home" });
      } catch {
        console.error("Google Sign-In Failed");
      }
    },

    async logout() {
      await signOut(auth);
      RESET_USER_DATA();
      router.push({ name: "Home" });
    },

    async resetPassword({ email }) {
      try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Reset email sent" };
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    async changePassword(currentPassword, newPassword) {
      try {
        const user = getAuth().currentUser;
        await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, currentPassword)
        );
        await updatePassword(user, newPassword);
        return { success: true, message: "Password updated" };
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    async deleteUserAccount(currentPassword) {
      try {
        const user = getAuth().currentUser;
        await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, currentPassword)
        );
        await deleteUser(user);

        const options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json", uid: user.uid },
        };

        await this.manageUserWithDB(options);
        RESET_USER_DATA();
        router.push({ name: "Home" });
        return { success: true, message: "Account deleted" };
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    async initializeAuth() {
      this.isLoading = true;
      onAuthStateChanged(auth, async (user) => {
        this.isLoading = false;
        if (user) {
          this.user = user;
          await this.getUserPerms(user.uid);
          if (
            ["/login", "/register"].includes(router.currentRoute.value.fullPath)
          ) {
            router.push({ name: "Home" });
          }
        } else {
          RESET_USER_DATA();
        }
      });
    },

    async getUserPerms(uid) {
      if (uid) {
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json", uid },
        };
        this.permissions = (await this.manageUserWithDB(options)) || {};
      }
    },

    async manageUserWithDB(options) {
      for (const url of USER_API_URLS) {
        try {
          const response = await fetch(url, options);
          if (response.ok) return await response.json();
        } catch (error) {
          console.error(`Request to ${url} failed`, error);
        }
      }
      return null; // Avoid throwing errors that could break the app
    },

    async manageQueueWithDB(options) {
      for (const url of QUEUE_API_URLS) {
        try {
          const response = await fetch(url, options);
          if (response.ok) return await response.json();
        } catch (error) {
          console.error(`Request to ${url} failed`, error);
        }
      }
      return null;
    },

    async getAdminQueue(uid) {
      if (!uid) return;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", uid: this.user.uid },
      };
      this.admin.queue = (await this.manageQueueWithDB(options)) || [];
    },

    async submitQueueTicket() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", uid: this.user.uid },
      };

      await this.manageQueueWithDB(options);
    },

    async deleteQueueTicket(uid) {
      if (!uid) return;

      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", uid: this.user.uid },
        body: JSON.stringify({ update_uid: uid }),
      };

      const response = await this.manageQueueWithDB(options);

      if (response?.success) {
        this.admin.queue.queue = this.admin.queue.queue.filter(
          (user) => user.firebase_uid !== uid
        );
      }
    },

    async approveUserTicket(uid) {
      if (!uid) return;

      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json", uid: this.user.uid },
        body: JSON.stringify({ update_uid: uid }),
      };

      const response = await this.manageUserWithDB(options);

      if (response?.success) {
        this.admin.queue.queue = this.admin.queue.queue.filter(
          (user) => user.firebase_uid !== uid
        );
      }
    },

    handleAuthError(error) {
      const messages = {
        "auth/email-already-in-use": "This email is already in use",
        "auth/weak-password": "Password must be at least 8 characters",
        "auth/user-not-found": "No account found with that email",
        "auth/wrong-password": "Incorrect password",
        "auth/requires-recent-login": "Please log in again before proceeding",
        "auth/missing-password": "Please enter your password",
      };
      return {
        success: false,
        message: messages[error.code] || "Something went wrong. Try again.",
      };
    },
  },
});
