<template>
  <AuthLayout>
    <template #body>
      <div class="flex flex-col items-start justify-center space-y-4">
        <h1 class="text-2xl font-bold">Log in to Movieopolis</h1>
        <p class="text-neutral">
          Don't have an account?
          <router-link :to="{ name: 'Register' }" class="text-base-content"
            >Register</router-link
          >
        </p>
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

        <div class="form-control">
          <label
            class="input input-bordered flex items-center gap-2"
            :class="formValueErrors.password ? 'input-error' : ''"
          >
            Password
            <input
              placeholder="Password"
              type="password"
              class="max-w-full"
              v-model="formValue.password"
              @blur="validateField('password')"
            />
          </label>
          <div class="form-control"></div>
          <label>
            <span class="text-error"> {{ formValueErrors.password }}</span>
          </label>
        </div>

        <div class="form-control">
          <div class="flex justify-end">
            <label>
              <router-link
                :to="{ name: 'Reset' }"
                class="link link-underline-hover link-primary text-sm"
                >Forgot your password?</router-link
              >
            </label>
          </div>
        </div>

        <div class="text-error" v-if="formValueErrors.message">
          {{ formValueErrors.message }}
        </div>

        <div class="form-field pt-5">
          <div class="form-control justify-between">
            <button
              @click="validateForm()"
              type="button"
              class="btn btn-primary w-full"
            >
              Log in
            </button>
          </div>
        </div>

        <div class="divider py-4 uppercase text-neutral">or continue with</div>

        <div class="flex justify-center space-x-4 w-full">
          <div
            class="flex justify-center items-center px-12 py-4 rounded-xl cursor-pointer shadow shadow-primary bg-base-300"
            @click="googleSignIn()"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 48 48"
              enablebackground="new 0 0 48 48"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
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

const { googleSignIn } = userStore;

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required(""),
  password: yup.string().required(""),
});

const formValue = reactive({
  email: null,
  password: null,
});

const formValueErrors = reactive({
  email: null,
  password: null,
  failedLogin: false,
  message: null,
});

const validateField = (field) => {
  // Validate each field after user has clicked off the field
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
    if (formValue.password && !formValueErrors.password) {
      // login
      userStore
        .login(formValue)
        .then((response) => {
          if (response.success == false) {
            formValueErrors.failedLogin = true;
            formValueErrors.message = response.message;
          } else {
            formValueErrors.failedLogin = false;
          }
        })
        .catch((err) => {});
    }
  }
};
</script>

<style scoped></style>
