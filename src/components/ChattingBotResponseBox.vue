<template>
  <div class="chat-bot-response">
    <div class="w-[40px] h-[40px] rounded-full bg-[#f59e0c] flex items-center justify-center mr-2">
      <i class="fa-solid fa-comments text-white"></i>
    </div>
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

/* 아이콘 색상이 Tailwind 클래스로 적용되지 않을 경우를 위한 백업 스타일 */
.fa-comments {
  color: white;
}
</style>
