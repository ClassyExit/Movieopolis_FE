<template>
  <AuthLayout>
    <template #body>
      <div class="flex flex-col items-start justify-center space-y-4">
        <h1 class="text-2xl font-bold">Create an Movieopolis account</h1>
        <p class="text-neutral">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="text-base-content"
            >Log in</router-link
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
              Sign up
            </button>
          </div>
        </div>

        <div class="divider py-4 uppercase text-neutral">or continue with</div>

        <div class="flex justify-center space-x-4 w-full">
          <div
            class="flex justify-center items-center px-12 py-4 rounded-xl cursor-pointer shadow shadow-primary bg-base-200"
            @click="googleSignIn()"
          >
            <Google />
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
import Google from "@/assets/icons/Google.vue";

const userStore = useUserStore();

const { googleSignIn } = userStore;

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required(""),
  password: yup
    .string()
    .min(8, "Your password must be atleast 8 characters")
    .required(""),
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
