<template>
  <AuthLayout>
    <template #body>
      <div class="flex flex-col items-start justify-center space-y-4">
        <h1 class="text-2xl font-bold">Reset your password</h1>
      </div>

      <div class="space-y-4">
        <div class="form-control">
          <label
            class="input input-bordered flex items-center gap-2"
            :class="formValueErrors.email ? ' input-error' : ''"
          >
            Email
            <input
              required
              placeholder="example@email.com"
              type="email"
              class=""
              v-model="formValue.email"
              @blur="validateField('email')"
            />
          </label>
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.email }}</span
            >
          </label>
        </div>

        <div class="text-error" v-if="formValueErrors.message">
          {{ formValueErrors.message }}
        </div>

        <div
          v-if="formValueErrors.resetStatus"
          class=""
          :class="
            formValueErrors.resetStatus == 'failed'
              ? 'text-error'
              : 'text-success'
          "
        >
          <div class="flex flex-col text-left">
            <span class="text-content2">{{ formValueErrors.resetMsg }}</span>
          </div>
        </div>

        <div class="form-field pt-5">
          <div class="form-control justify-between">
            <button
              @click="validateForm()"
              type="button"
              class="btn btn-primary w-full"
            >
              Send reset instructions
            </button>
          </div>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "./AuthLayout.vue";
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
import * as yup from "yup";

const userStore = useUserStore();

userStore.resetErrors = "";
userStore.resetSuccess = "";

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required(""),
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
