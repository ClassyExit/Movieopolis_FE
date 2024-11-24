<template>
  <div
    class="w-full text-left px-4 space-y-4 pt-4 md:pt-20 container mx-auto md:max-w-3xl lg:max-w-4xl text-base-content"
  >
    <div class="justify-start flex w-full"><MobileReturn /></div>
    <div v-if="updatePasswordResults.result.length" class="w-full max-w-2xl">
      <div
        class="alert"
        :class="
          updatePasswordResults.result == 'error'
            ? 'alert-error'
            : 'alert-success'
        "
      >
        <Icon
          v-if="updatePasswordResults.result == 'success'"
          icon="ep:success-filled"
          width="25"
          height="25"
        />

        <Icon v-else icon="ic:baseline-error" width="25" height="25" />

        <div class="flex flex-col text-left">
          <span>Password Change</span>
          <span class="text-content2">{{ updatePasswordResults.message }}</span>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col text-left py-8 space-y-8 justify-center rounded max-w-2xl w-full"
    >
      <div class="text-primary">
        <Icon icon="mdi:password-outline" width="30" height="30" />
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl text-content1">Change Password</h1>
        <div v-if="signedInWithGoogle" class="">
          <div class="text-error text-xl">
            Unable to change password when signing using Google
          </div>
        </div>
        <p v-if="!signedInWithGoogle" class="text-content2">
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters.
        </p>
      </div>

      <div class="form-group" v-if="!signedInWithGoogle">
        <div class="form-control relative w-full flex flex-col">
          <div class="flex flex-col w-full space-y-2">
            <h1 class="text-lg text-content2">Current Password</h1>
            <input
              :type="revealCurrentPass ? 'text' : 'password'"
              class="input input-lg max-w-full pl-10 pr-10"
              placeholder="Enter Current Password"
              v-model="formValue.currentPass"
              @blur="validateField('currentPass')"
              :class="formValueErrors.currentPass ? 'input-error' : ''"
            />
          </div>
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.currentPass }}</span
            >
          </label>

          <span class="absolute top-12 left-3 inline-flex items-center">
            <Icon icon="mdi:password-outline" width="20" height="20" />
          </span>

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
            <Icon v-else icon="clarity:eye-hide-solid" width="20" height="20" />
          </span>
        </div>

        <div class="form-control relative w-full flex flex-col">
          <div class="flex flex-col w-full space-y-2">
            <h1 class="text-lg text-content2">New Password</h1>
            <input
              :type="revealNewPass ? 'text' : 'password'"
              class="input input-lg max-w-full pl-10 pr-10"
              placeholder="Enter New Password"
              v-model="formValue.newPass"
              @blur="validateField('newPass')"
              :class="formValueErrors.newPass ? 'input-error' : ''"
            />
          </div>
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.newPass }}</span
            >
          </label>

          <span class="absolute top-12 left-3 inline-flex items-center">
            <Icon icon="mdi:password-outline" width="20" height="20" />
          </span>

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
            <Icon v-else icon="clarity:eye-hide-solid" width="20" height="20" />
          </span>
        </div>

        <div class="form-control relative w-full flex flex-col">
          <div class="flex flex-col w-full space-y-2">
            <h1 class="text-lg text-content2">Confirm Password</h1>
            <input
              :type="revealConfirmPass ? 'text' : 'password'"
              class="input input-lg max-w-full pl-10 pr-10"
              placeholder="Confirm New Password"
              v-model="formValue.confirmPass"
              @blur="validateField('confirmPass')"
              :class="formValueErrors.confirmPass ? 'input-error' : ''"
            />
          </div>
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.confirmPass }}</span
            >
          </label>

          <span class="absolute top-12 left-3 inline-flex items-center">
            <Icon icon="mdi:password-outline" width="20" height="20" />
          </span>

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
            <Icon v-else icon="clarity:eye-hide-solid" width="20" height="20" />
          </span>
        </div>

        <div @click="validateForm()" class="w-full btn btn-primary my-2">
          Change Password
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

if (useUserStore().user.providerData[0].providerId == "google") {
  signedInWithGoogle.value = true;
}

useUserStore().updatePasswordResults = { result: "", message: "" };

const revealCurrentPass = ref(false);
const revealNewPass = ref(false);
const revealConfirmPass = ref(false);

const schema = yup.object({
  currentPass: yup.string().required("This field is required"),
  newPass: yup
    .string()
    .min(8, "The password must be atleast 8 characters")
    .required("This field is required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("newPass"), null], "Passwords must match")
    .required("This field is required"),
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
