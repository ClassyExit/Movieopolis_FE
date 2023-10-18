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
} from "firebase/auth";

import { resetStore } from "./resetStore";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    changePasswordValidation: { type: "", message: "" },
    deleteAccountErrors: "",
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
        return status;
      }

      this.user = auth.currentUser;
      router.push({ name: "Home" });

      status.success = true;
      return status;
    },

    async register(user) {
      /* REGISTER A NEW USER */

      const status = {
        success: true | false,
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

        status.success = false;
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

      router.push({ name: "Home" });
    },

    async resetPassword(user) {
      /* SEND USER A RESET PASSWORD LINK */

      const status = {
        success: true | false,
        message: null,
      };

      await sendPasswordResetEmail(auth, user.email)
        .then(() => {
          // Password reset email sent!
          status.success = true;
          status.message =
            "Success! We have sent an email with instructions on resetting your password to your email.";
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

          status.success = false;

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
                this.changePasswordValidation.type = "success";
                this.changePasswordValidation.message =
                  "Your password has been updated!";
              })
              .catch((error) => {
                this.changePasswordValidation.type = "error";
                this.changePasswordValidation.message =
                  "Uh-oh, something went wrong here. Please try again";
              });
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/wrong-password":
                this.changePasswordValidation.type = "error";
                this.changePasswordValidation.message =
                  "Incorrect current password";
                break;
              default:
                this.changePasswordValidation.type = "error";
                this.changePasswordValidation.message =
                  "Uh-oh, something went wrong. Please try again";

                break;
            }
          });
      } catch (error) {
        this.changePasswordValidation.type = "error";
        this.changePasswordValidation.message =
          "Uh-oh, something went wrong here. Please try again";
      }
    },

    async deleteUserAccount(currentPassword) {
      /* DELETE A USERS ACCOUNT */

      const auth = getAuth();
      const user = auth.currentUser;

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
                this.deleteAccountErrors =
                  "Uh-oh, something went wrong. Please try again";
              });
          })
          .catch((error) => {
            //Error

            switch (error.code) {
              case "auth/wrong-password":
                this.deleteAccountErrors = "Incorrect Current Password";
                break;
              case "auth/too-many-requests":
                this.deleteAccountErrors =
                  "Uh-oh, too many requests. Try again in a few seconds";
                break;
              default:
                this.deleteAccountErrors =
                  "Uh-oh, something went wrong. Please try again";
                break;
            }
          });
      } catch (error) {
        //error
        this.deleteAccountErrors =
          "Uh-oh, something went wrong. Please try again";
      }
    },
  },
});
