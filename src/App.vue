<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useUserStore } from './stores/userStore';
const userStore = useUserStore();

userStore.checkAuth(); // 앱 시작시 로그인 상태 확인
</script>

<template>
  <RouterView />
  <!-- <NavBar /> -->
</template>

<style scoped></style>
