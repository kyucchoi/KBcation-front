<!-- ChattingBotResponseBox.vue -->
<template>
  <div class="chat-bot-response">
    <div class="w-[40px] h-[40px] rounded-full bg-[#f59e0c] flex items-center mr-2"></div>
    <div class="bot-message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: String
});
</script>

<style scoped>
.chat-bot-response {
  display: flex;
  justify-content: flex-start;
}

.bot-message {
  padding: 10px;
  background-color: #f59e0c;
  border-radius: 12px;
  color: white;
  max-width: 300px;
}
</style>
