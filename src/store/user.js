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

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    permissions: {},

    // type: success || error, message: Describe to user what happen
    deleteAccountResults: { result: "", message: "" },
    updatePasswordResults: { result: "", message: "" },
    isLoading: false,
  }),
  persist: true,
  getters: {},
  actions: {
    async login(user) {
      /* LOGIN A EXISTING USER */
      const status = {
        success: false | true,
        message: null,
      };

      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
      } catch (err) {
        status.success = false;
        status.message = "Invalid email or password";
        return status;
      }

      this.user = auth.currentUser;
      console.log("Email login ID: ", auth.currentUser.uid);
      this.getUserPerms(auth.currentUser.uid);
      router.push({ name: "Home" });
    },

    async getUserPerms(uid) {
      if (!uid) return;

      const request_options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
        },
      };

      this.permissions = await this.manageUserWithDB(request_options);
    },

    async manageUserWithDB(request_options) {
      /*
      manage a new user with the database passing in their UID from firebase
      method:
      POST: Create a new user
      DELETE: Delete a user
      GET: Get user info/permissions
      headers: { "Content-Type": "application/json", uid: uid }
      */

      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/user`,
          request_options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch from primary URL");
        }
        return await response.json();
      } catch (error) {
        console.error("Primary request failed:", error);

        // Server is idling, fallback to second URL
        try {
          const response = await fetch(
            `https://tmdb-backend.autoidleapp.com/api/user`,
            request_options
          );
          if (!response.ok) {
            throw new Error("Failed to fetch from fallback URL");
          }
          return await response.json();
        } catch (error) {
          console.error("Fallback request failed:", error);
          throw error;
        }
      }
    },

    async googleSignIn() {
      const provider = new GoogleAuthProvider();

      try {
        const res = await signInWithPopup(auth, provider);
        const { isNewUser } = getAdditionalUserInfo(res);

        // Add new user to DB
        if (isNewUser) {
          const request_options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              uid: res.user.uid,
            },
          };
          await this.manageUserWithDB(request_options);
        }

        this.user = res.user;
        await this.getUserPerms(res.user.uid);
        router.push({ name: "Home" });
      } catch (err) {
        // console.error("Google Sign-In Failed:", err.message);
      }
    },

    async register(user) {
      /* REGISTER A NEW USER */

      const status = {
        success: false,
        message: null,
      };

      try {
        await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        ).then((res) => {
          // Register user with database
          const request_options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              uid: res.user.uid,
            },
          };
          this.manageUserWithDB(request_options);
        });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            status.message = "This email is already in use";
            break;
          case "auth/weak-password":
            status.message = "Password must be atleast 8 characters";
            break;
          default:
            status.message = `Uh-oh, something went wrong. Try again.`;
        }
        return status;
      }

      this.user = auth.currentUser;
      this.getUserPerms(auth.currentUser.uid);
      router.push({ name: "Home" });
    },

    async logout() {
      /* Sign a user out and reset all stores */
      await signOut(auth);

      // Wipe all user store data
      RESET_USER_DATA();

      router.push({ name: "Home" });
    },

    async resetPassword(user) {
      /* SEND USER A RESET PASSWORD LINK */

      const status = {
        success: false,
        message: null,
      };

      await sendPasswordResetEmail(auth, user.email)
        .then(() => {
          // Password reset email sent!
          status.success = true;
          status.message =
            "We have sent an email with instructions on resetting your password";
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              status.message = "No account found with that email";
              break;
            case "auth/missing-email":
              status.message = "Enter your email used during registration";
              break;
            default:
              status.message = `Uh-oh, something went wrong. Please try again`;
              break;
          }
          return status;
        });
    },

    async initializeAuth() {
      /* GET THE CURRENT USERS AUTHENTICATION STATE */

      this.isLoading = true;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = auth.currentUser;

          // Get user perms
          this.getUserPerms(auth.currentUser.uid);

          // Check to see if user is on auth pages
          if (
            router.currentRoute.value.fullPath === ("/login" || "/register")
          ) {
            router.push({ name: "Home" });
          }
        } else {
          resetStore();
        }
        this.isLoading = false;
      });
    },

    async changePassword(currentPassword, newPassword) {
      /* CHANGE A USERS PASSWORD */

      const auth = getAuth();
      const user = auth.currentUser;

      this.updatePasswordResults = { result: "", message: "" };

      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        reauthenticateWithCredential(user, credential)
          .then(() => {
            updatePassword(user, newPassword)
              .then(() => {
                //Update success
                this.updatePasswordResults.result = "success";
                this.updatePasswordResults.message =
                  "Your password has been updated!";
              })
              .catch((error) => {
                this.updatePasswordResults.result = "error";
                this.updatePasswordResults.message =
                  "Something went wrong. Please try again";
              });
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/wrong-password":
                this.updatePasswordResults.result = "error";
                this.updatePasswordResults.message =
                  "Incorrect current password";
                break;
              default:
                this.updatePasswordResults.result = "error";
                this.updatePasswordResults.message =
                  "Something went wrong. Please try again";
                break;
            }
          });
      } catch (error) {
        this.updatePasswordResults.result = "error";
        this.updatePasswordResults.message =
          "Something went wrong. Please try again";
      }
    },

    async deleteUserAccount(currentPassword) {
      const auth = getAuth();
      const user = auth.currentUser;

      this.deleteAccountResults = { result: "", message: "" };

      if (!user) {
        this.deleteAccountResults.result = "error";
        this.deleteAccountResults.message = "No user is currently signed in.";
        return;
      }

      try {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Delete user
        await deleteUser(user);

        // Remove user from database

        const request_options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            uid: user.uid,
          },
        };
        this.manageUserWithDB(request_options);

        // Reset store data
        resetStore();

        // Show success message
        alert("Account Deleted Successfully");

        // Redirect to homepage
        router.push({ name: "Home" });
      } catch (error) {
        switch (error.code) {
          case "auth/wrong-password":
            this.deleteAccountResults.result = "error";
            this.deleteAccountResults.message = "Incorrect Current Password";
            break;
          case "auth/too-many-requests":
            this.deleteAccountResults.result = "error";
            this.deleteAccountResults.message =
              "Uh-oh, too many requests. Try again in a few seconds";
            break;
          case "auth/requires-recent-login":
            this.deleteAccountResults.result = "error";
            this.deleteAccountResults.message =
              "Please log in again before deleting your account.";
            break;
          case "auth/missing-password":
            this.deleteAccountResults.result = "error";
            this.deleteAccountResults.message =
              "Please input your current password";
            break;
          default:
            this.deleteAccountResults.result = "error";
            this.deleteAccountResults.message =
              "Unable to delete account. Please try again";
            break;
        }
      }
    },
  },
});
