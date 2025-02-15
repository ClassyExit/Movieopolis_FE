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
} from "firebase/auth";

import { resetStore } from "./resetStore";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,

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
        console.log(err);
        status.success = false;
        status.message = "Invalid email or password";
        return status;
      }

      this.user = auth.currentUser;
      router.push({ name: "Home" });

      status.success = true;
      return status;
    },

    async googleSignIn() {
      const provider = await new GoogleAuthProvider();

      return signInWithPopup(auth, provider)
        .then((res) => {
          // User signed in
          this.user = res.user;

          router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    async register(user) {
      /* REGISTER A NEW USER */

      const status = {
        success: false,
        message: null,
      };

      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
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
      status.success = true;

      router.push({ name: "Home" });

      return status;
    },

    async logout() {
      /* Sign a user out and reset all stores */
      await signOut(auth);

      resetStore();

      router.push({ name: "Login" });
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

      return status;
    },

    async initializeAuth() {
      /* GET THE CURRENT USERS AUTHENTICATION STATE */

      this.isLoading = true;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = auth.currentUser;

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
                  "Uh-oh, something went wrong here. Please try again";
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
                  "Uh-oh, something went wrong. Please try again";

                break;
            }
          });
      } catch (error) {
        this.updatePasswordResults.result = "error";
        this.updatePasswordResults.message =
          "Uh-oh, something went wrong here. Please try again";
      }
    },

    async deleteUserAccount(currentPassword) {
      /* DELETE A USERS ACCOUNT */

      const auth = getAuth();
      const user = auth.currentUser;

      this.deleteAccountResults = { result: "", message: "" };

      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        reauthenticateWithCredential(user, credential)
          .then(() => {
            deleteUser(user)
              .then(() => {
                //User Deleted
                resetStore();
                alert("Account Deleted Successfully");
                // Push to homepage
                router.push({ name: "Home" });
              })
              .catch((error) => {
                //Error
                this.deleteAccountResults.result = "error";
                this.deleteAccountResults.message =
                  "Uh-oh, something went wrong. Please try again";
              });
          })
          .catch((error) => {
            //Error

            switch (error.code) {
              case "auth/wrong-password":
                this.deleteAccountResults.result = "error";
                this.deleteAccountResults.message =
                  "Incorrect Current Password";
                break;
              case "auth/too-many-requests":
                this.deleteAccountResults.result = "error";
                this.deleteAccountResults.message =
                  "Uh-oh, too many requests. Try again in a few seconds";
                break;
              default:
                this.deleteAccountResults.result = "error";
                this.deleteAccountResults.message =
                  "Uh-oh, something went wrong. Please try again";
                break;
            }
          });
      } catch (error) {
        //error

        this.deleteAccountResults.result = "error";
        this.deleteAccountResults.message =
          "Uh-oh, something went wrong. Please try again";
      }
    },
  },
});
