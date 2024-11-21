<template>
  <div class="chat-bot-response">
    <div class="w-[40px] h-[40px] rounded-full bg-[#f59e0c] flex items-center justify-center mr-2">
      <i class="fa-solid fa-comments text-white"></i>
    </div>
    <div class="bot-message" v-html="formattedMessage"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  message: String
});

// 메시지 포맷팅 함수
const formattedMessage = computed(() => {
  if (!props.message) return '';

  return (
    props.message
      // 헤더 변환 (# 텍스트 → <h1>텍스트</h1>)
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // 볼드체 변환 (**텍스트** → <strong>텍스트</strong>)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  );
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
  white-space: pre-wrap; /* 이 줄을 추가 */
}

:deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 0.5em 0;
}

:deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.4em 0;
}

:deep(h3) {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.3em 0;
}

:deep(strong) {
  font-weight: bold;
}

/* 아이콘 색상이 Tailwind 클래스로 적용되지 않을 경우를 위한 백업 스타일 */
.fa-comments {
  color: white;
}
</style>
