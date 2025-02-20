<template>
  <div class="w-full flex justify-center items-start md:items-center pb-8">
    <div class="w-full text-base-content space-y-8">
      <div class="flex w-full justify-start md:justify-center">
        <MobileReturn />
      </div>
      <div
        class="w-full flex flex-col items-center justify-start md:justify-center"
      >
        <div
          v-if="updatePasswordResults.result.length"
          class="w-full max-w-2xl"
        >
          <div
            class="alert"
            :class="
              updatePasswordResults.result == 'error'
                ? 'alert-error'
                : 'alert-success'
            "
          >
            <svg
              v-if="updatePasswordResults.result == 'success'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>{{ updatePasswordResults.message }}</span>
          </div>
        </div>

        <div
          class="flex flex-col text-left space-y-8 rounded max-w-2xl w-full bg-base-300 p-4"
        >
          <div class="text-primary">
            <Icon icon="mdi:password-outline" width="30" height="30" />
          </div>

          <div class="space-y-4">
            <h1 class="text-3xl text-content1">Change Password</h1>
            <div v-if="signedInWithGoogle" class="">
              <div class="text-error text-xl">
                Unable to change password when using
                {{ userStore.user.providerData[0].providerId }} signin method
              </div>
            </div>
            <p v-else class="text-content2">
              To change your password, please fill in the fields below. Your
              password must contain at least 8 characters.
            </p>
          </div>

          <div class="form-group space-y-4">
            <div class="form-control relative w-full flex flex-col">
              <div class="flex flex-col w-full space-y-2">
                <h1 class="text-lg text-content2">Current Password</h1>

                <label class="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="grow"
                    value="password"
                    :type="revealCurrentPass ? 'text' : 'password'"
                    @blur="validateField('currentPass')"
                    v-model="formValue.currentPass"
                    placeholder="Enter Current Password"
                    :class="formValueErrors.currentPass ? 'input-error' : ''"
                  />
                </label>
              </div>
              <label class="form-label">
                <span class="form-label-alt text-left text-error">
                  {{ formValueErrors.currentPass }}</span
                >
              </label>
              <span
                @click="revealCurrentPass = !revealCurrentPass"
                class="absolute top-12 right-3 inline-flex items-center"
              >
                <Icon
                  v-if="!revealCurrentPass"
                  icon="mdi:eye-outline"
                  width="20"
                  height="20"
                />
                <Icon
                  v-else
                  icon="clarity:eye-hide-solid"
                  width="20"
                  height="20"
                />
              </span>
            </div>

            <div class="form-control relative w-full flex flex-col">
              <div class="flex flex-col w-full space-y-2">
                <h1 class="text-lg text-content2">New Password</h1>

                <label class="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="grow"
                    value="password"
                    :type="revealNewPass ? 'text' : 'password'"
                    @blur="validateField('newPass')"
                    placeholder="Enter New Password"
                    v-model="formValue.newPass"
                    :class="formValueErrors.newPass ? 'input-error' : ''"
                  />
                </label>
              </div>
              <label class="form-label">
                <span class="form-label-alt text-left text-error">
                  {{ formValueErrors.newPass }}</span
                >
              </label>

              <span
                @click="revealNewPass = !revealNewPass"
                class="absolute top-12 right-3 inline-flex items-center"
              >
                <Icon
                  v-if="!revealCurrentPass"
                  icon="mdi:eye-outline"
                  width="20"
                  height="20"
                />
                <Icon
                  v-else
                  icon="clarity:eye-hide-solid"
                  width="20"
                  height="20"
                />
              </span>
            </div>

            <div class="form-control relative w-full flex flex-col">
              <div class="flex flex-col w-full space-y-2">
                <h1 class="text-lg text-content2">Confirm Password</h1>

                <label class="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="grow"
                    value="password"
                    :type="revealConfirmPass ? 'text' : 'password'"
                    @blur="validateField('confirmPass')"
                    placeholder="Confirm New Password"
                    v-model="formValue.confirmPass"
                    :class="formValueErrors.confirmPass ? 'input-error' : ''"
                  />
                </label>
              </div>
              <label class="form-label">
                <span class="form-label-alt text-left text-error">
                  {{ formValueErrors.confirmPass }}</span
                >
              </label>

              <span
                @click="revealConfirmPass = !revealConfirmPass"
                class="absolute top-12 right-3 inline-flex items-center"
              >
                <Icon
                  v-if="!revealConfirmPass"
                  icon="mdi:eye-outline"
                  width="20"
                  height="20"
                />
                <Icon
                  v-else
                  icon="clarity:eye-hide-solid"
                  width="20"
                  height="20"
                />
              </span>
            </div>

            <div
              @click="validateForm()"
              class="w-full btn my-2"
              :class="signedInWithGoogle ? 'btn-disabled' : 'btn-primary'"
            >
              Change Password
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import * as yup from "yup";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const { updatePasswordResults } = storeToRefs(useUserStore());

// Provider Id: password | google
const signedInWithGoogle = ref(false);

const userStore = useUserStore();

if (userStore.user.providerData[0].providerId == "google.com") {
  signedInWithGoogle.value = true;
}

userStore.updatePasswordResults = { result: "", message: "" };

const revealCurrentPass = ref(false);
const revealNewPass = ref(false);
const revealConfirmPass = ref(false);

const schema = yup.object({
  currentPass: yup.string().required(""),
  newPass: yup
    .string()
    .min(8, "The password must be atleast 8 characters")
    .required(""),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("newPass"), null], "Passwords must match")
    .required(""),
});

const formValue = reactive({
  currentPass: null,
  newPass: null,
  confirmPass: null,
});

const formValueErrors = reactive({
  currentPass: null,
  newPass: null,
  confirmPass: null,
});

const validateField = (field) => {
  schema
    .validateAt(field, formValue)
    .then(() => {
      formValueErrors[field] = "";
    })
    .catch((err) => {
      formValueErrors[field] = err.message;
    });
};

const validateForm = () => {
  if (formValue.currentPass && !formValueErrors.currentPass) {
    if (formValue.newPass && !formValueErrors.newPass) {
      if (formValue.confirmPass && !formValueErrors.confirmPass) {
        // Change Password
        useUserStore().changePassword(formValue.currentPass, formValue.newPass);
      }
    }
  }
};
</script>
