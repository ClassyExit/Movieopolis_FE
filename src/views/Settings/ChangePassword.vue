<template>
  <div
    class="mx-auto py-4 pb-8 md:py-0 flex w-full items-center justify-center max-w-lg flex-col"
  >
    {{ updatePasswordResults.result }}
    {{ updatePasswordResults.message }}
    <div
      v-if="updatePasswordResults.result.length"
      class="w-full max-w-2xl px-4"
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
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z"
            fill="#00BA34"
          />
        </svg>
        <div class="flex flex-col text-left">
          <span>Password</span>
          <span class="text-content2">{{ updatePasswordResults.message }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col text-left p-8 space-y-8 justify-center rounded max-w-2xl w-full"
    >
      <div class="text-primary">
        <Icon icon="mdi:password-outline" width="30" height="30" />
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl text-content1">Change Password</h1>
        <p class="text-content2">
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters.
        </p>
      </div>

      <div class="form-group">
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
              placeholder="Enter Current Password"
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
              placeholder="Enter Current Password"
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

const { updatePasswordResults } = storeToRefs(useUserStore());

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
