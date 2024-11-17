<!-- ChattingUserInputBox.vue -->
<template>
  <div class="chat-user-input">
    <div class="user-message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: String
});
</script>

<style scoped>
.chat-user-input {
  display: flex;
  justify-content: flex-end;
}

.user-message {
  padding: 10px;
  background-color: #d1d1d1;
  border-radius: 12px;
  color: black;
  max-width: 300px;
}
</style>
