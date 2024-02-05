<template>
  <div
    class="mx-auto py-8 flex w-full items-center justify-center max-w-lg flex-col"
  >
    <div
      class="w-full md:bg-backgroundSecondary text-content2 p-4 space-y-4 rounded md:shadow-xl"
    >
      <div class="flex flex-col items-center space-y-6">
        <div
          class="rounded-full bg-gradient-to-r from-primary to-secondary p-1"
        >
          <div class="bg-backgroundSecondary rounded-full p-2">
            <Icon icon="mdi:register" width="30" height="30" />
          </div>
        </div>
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-semibold">Sign Up</h1>
          <p class="text-sm text-content3">Create your account</p>
        </div>
      </div>

      <div class="w-full">
        <button
          type="button"
          class="btn w-full gap-2 bg-gray-5"
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
          <span>Continue with Google</span>
        </button>
      </div>
      <div class="divider my-6 text-xs text-content2">or</div>

      <div v-if="formValueErrors.failedRegister" class="alert alert-error">
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
            d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z"
            fill="#E92C2C"
          />
        </svg>
        <div class="flex flex-col text-left">
          <span class="text-content2"
            >{{ formValueErrors.failedRegisterMsg }}
          </span>
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
        <div class="form-field">
          <label class="form-label">Password</label>
          <div class="form-control">
            <input
              placeholder="Password"
              type="password"
              class="input max-w-full"
              v-model="formValue.password"
              @blur="validateField('password')"
              :class="formValueErrors.password ? 'input-error' : ''"
            />
          </div>
          <label class="form-label">
            <span class="form-label-alt text-left text-error">
              {{ formValueErrors.password }}</span
            >
          </label>
        </div>

        <div class="form-field">
          <div class="form-control justify-between">
            <div class="flex gap-2">
              <input type="checkbox" class="checkbox" />
              <a href="#">Remember me</a>
            </div>
            <label class="form-label">
              <router-link
                :to="{ name: 'Reset' }"
                class="link link-underline-hover link-primary text-sm"
                >Forgot your password?</router-link
              >
            </label>
          </div>
        </div>
        <div class="form-field pt-5">
          <div class="form-control justify-between">
            <button
              @click="validateForm()"
              type="button"
              class="btn btn-primary w-full"
            >
              Sign up
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
          /><span>Already have an account? Log in</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/user";
import * as yup from "yup";

const userStore = useUserStore();

const { googleSignIn } = userStore;

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(8, "Your password must be atleast 8 characters")
    .required("This field is required"),
});

const formValue = reactive({
  email: null,
  password: null,
});

const formValueErrors = reactive({
  email: null,
  password: null,

  failedRegister: null,
  failedRegisterMsg: null,
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
    if (formValue.password && !formValueErrors.password) {
      // Register
      userStore
        .register(formValue)
        .then((response) => {
          if (response.success == false) {
            formValueErrors.failedRegister = true;
            formValueErrors.failedRegisterMsg = response.message;
          } else {
            formValueErrors.failedRegister = false;
          }
        })
        .catch((err) => {});
    }
  }
};
</script>

<style scoped></style>
