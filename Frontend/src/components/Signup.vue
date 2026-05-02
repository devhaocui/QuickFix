<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email format"),
});
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailError = ref("");

const API = "http://localhost:3000/api/users";
async function checkEmail() {
  if (!email.value) return;

  const res = await fetch(`${API}/checkEmail?email=${email.value}`);
  const data = await res.json();
  emailError.value = data.exists ? "Email already registered" : "";
}
async function onSubmit() {
  await checkEmail();
  if (emailError.value) return;

  const pw = password.value;
  const confirm = confirmPassword.value;
  if (pw !== confirm) {
    console.log("password must match");
    alert("password does not match");
    return;
  }

  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  });
  const data = await res.json();

  if (res.ok) {
    console.log("Registered:", data);
    // redirect to login or dashboard
  } else {
    console.log("Error:", data.message);
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <Card class="font-normal">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="name"> Full Name </FieldLabel>
              <Input
                id="name"
                v-model="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel for="email"> Email </FieldLabel>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="John@gmail.com"
                @blur="checkEmail"
                required
              />
              <p v-if="emailError" class="text-red-500 text-sm">
                {{ emailError }}
              </p>
              <FieldDescription>
                email is what you will use to sign in.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel for="password"> Password </FieldLabel>
              <Input
                id="password"
                v-model="password"
                type="password"
                required
              />
              <!-- <FieldDescription -->
              <!--   >Must be at least 8 characters long.</FieldDescription -->
              <!-- > -->
            </Field>
            <Field>
              <FieldLabel for="confirm-password"> Confirm Password </FieldLabel>
              <Input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                required
              />
              <!-- <FieldDescription>Please confirm your password.</FieldDescription> -->
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit"> Create Account </Button>
                <!-- <Button variant="outline" type="button"> -->
                <!--   Sign up with Google -->
                <!-- </Button> -->
                <FieldDescription class="px-6 text-center">
                  Already have an account? <a href="#/Login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
