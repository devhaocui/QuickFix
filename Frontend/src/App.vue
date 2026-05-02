<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import Payment from "@/components/Payment.vue";
import Main from "@/components/Main.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Form from "@/components/Form.vue";
import Profile from "@/components/Profile.vue";
import Test from "@/components/Test.vue";
import Temp from "@/components/Temp.vue";
import Provider from "@/components/Provider.vue";
import ProviderList from "@/components/ProviderList.vue";
import FavoriteProvider from "@/components/FavoriteProvider.vue";
import { Toaster } from "@/components/ui/sonner";
import Scheduler from "@/components/Scheduler.vue";

const routes = {
  "/": Main,
  "/Payment": Payment,
  "/Login": Login,
  "/Signup": Signup,
  "/Form": Form,
  "/Profile": Profile,
  "/Test": Test,
  "/Temp": Temp,
  // '/Provider': Provider,
  "/ProviderList": ProviderList,
  "/FavoriteProvider": FavoriteProvider,
  "/Scheduler": Scheduler,
};

const isLoggedIn = ref(true);
function handleLoginSuccess() {
  isLoggedIn.value = true;
  // window.location.hash = '/'
}

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"];
});
</script>

<template>
  <!-- NOTE: For dark mode and light mode. It doesn't work well right now. -->
  <!-- <ModeToggle /> -->

  <div class="w-full min-h-screen flex flex-col items-center">
    <Header v-show="isLoggedIn" />
    <div v-if="isLoggedIn" class="w-full flex flex-col items-center">
      <div class="w-full">
        <component :is="currentView" />
      </div>
    </div>
    <Login v-else @login-success="handleLoginSuccess" />
    <Toaster />
  </div>
</template>

<style scoped></style>
