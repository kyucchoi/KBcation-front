<script setup lang="ts">
import { useUserStore } from './stores/userStore';
const userStore = useUserStore();

userStore.checkAuth();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
