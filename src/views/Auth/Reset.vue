<template>
  <div
    class="mx-auto flex w-full items-center justify-center max-w-lg flex-col"
  >
    <div
      class="w-full md:bg-backgroundSecondary text-content2 p-4 space-y-4 rounded md:shadow-xl"
    >
      <div class="flex flex-col items-center space-y-6">
        <div
          class="rounded-full bg-gradient-to-r from-primary to-secondary p-1"
        >
          <div class="bg-backgroundSecondary rounded-full p-2">
            <Icon icon="mdi:password-reset" width="30" height="30" />
          </div>
        </div>
        <div class="flex flex-col">
          <h1 class="text-3xl font-semibold">Forgot password?</h1>
          <p class="text-sm text-content3">
            No worries, we'll send you reset instructions
          </p>
        </div>
      </div>

      <div
        v-if="formValueErrors.resetStatus"
        class="alert"
        :class="
          formValueErrors.resetStatus == 'failed'
            ? 'alert-error'
            : 'alert-success'
        "
      >
        <div class="flex flex-col text-left">
          <span class="text-content2">{{ formValueErrors.resetMsg }}</span>
        </div>
      </div>

      <div class="form-group">
        <div class="form-field">
          <label class="form-label">Email address</label>
          <input
            required
            placeholder="example@email.com"
            type="email"
            class="input max-w-full"
            v-model="formValue.email"
            @blur="validateField('email')"
            :class="formValueErrors.email ? 'input-error' : ''"
          />
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.email }}</span
            >
          </label>
        </div>

        <div class="form-field pt-5">
          <div class="form-control justify-between">
            <button
              @click="validateForm()"
              type="button"
              class="btn btn-primary w-full"
            >
              Reset password
            </button>
          </div>
        </div>
        <router-link
          :to="{ name: 'Login' }"
          class="flex flex-row items-center justify-center text-sm py-4 space-x-2 cursor-pointer hover:bg-gray-6 rounded"
        >
          <Icon
            icon="mdi:account-arrow-left-outline"
            width="25"
            height="25"
          /><span>Back to log in</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
import * as yup from "yup";

const userStore = useUserStore();

userStore.resetErrors = "";
userStore.resetSuccess = "";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
});

const formValue = reactive({
  email: null,
});

const formValueErrors = reactive({
  email: null,
  resetStatus: null,
  resetMsg: null,
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
  if (formValue.email && !formValueErrors.email) {
    userStore
      .resetPassword(formValue)
      .then((response) => {
        if (response.success == false) {
          // Failed
          formValueErrors.resetStatus = "failed";
          formValueErrors.resetMsg = response.message;
        } else {
          // Success
          formValueErrors.resetStatus = "success";
          formValueErrors.resetMsg = response.message;
        }
      })
      .catch((err) => {});
  }
};
</script>

<style scoped></style>
