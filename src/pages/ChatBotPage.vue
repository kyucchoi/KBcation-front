<template>
  <Main :padded="true" class="chat-gradation">
    <div class="w-100 h-[42px] mt-11 flex justify-start items-center gap-2 bg-white">
      <div class="">
        <img src="../assets/back.svg" alt="뒤로가기" @click="goBack" />
      </div>
      <div class="text-[#000000] text-[20px] font-semibold">챗봇</div>
    </div>
    <div class="chat-window">
      <!-- 대화 내용 출력 -->
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index">
          <ChattingBotResponseBox v-if="message.sender === 'bot'" :message="message.message" />
          <ChattingUserInputBox v-if="message.sender === 'user'" :message="message.message" />
        </div>
      </div>
      <!-- 사용자 입력 박스 -->
      <form @submit.prevent="handleUserMessage" class="input-box">
        <input
          v-model="userInput"
          type="text"
          placeholder="질문을 입력하세요..."
          class="input-field"
        />
        <button type="submit" class="send-button">전송</button>
      </form>
    </div>
  </Main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ChattingUserInputBox from '../components/ChattingUserInputBox.vue';
import ChattingBotResponseBox from '../components/ChattingBotResponseBox.vue';
import Main from '@/components/Main.vue';

const router = useRouter();

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

const initialMessage: ChatMessage = {
  sender: 'bot',
  message: '저는 챗봇이에요! 무엇을 도와드릴까요?'
};

const messages = ref<ChatMessage[]>([initialMessage]);
const userInput = ref<string>('');
const chatMessages = ref<HTMLElement | null>(null);

// 사용자가 메시지를 입력했을 때 실행되는 함수
const handleUserMessage = () => {
  if (userInput.value.trim() === '') return;

  // 사용자 메시지 추가
  messages.value.push({
    sender: 'user',
    message: userInput.value
  });

  const currentInput = userInput.value;
  userInput.value = ''; // 입력창 초기화

  // 챗봇 응답 추가
  setTimeout(() => {
    const botResponse = getBotResponse(currentInput);
    messages.value.push({
      sender: 'bot',
      message: botResponse
    });

    // 스크롤 최하단으로 이동
    nextTick(() => {
      if (chatMessages.value) {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
      }
    });
  }, 1000);
};

// 챗봇 응답 로직
const getBotResponse = (userMessage: string) => {
  if (userMessage.includes('카드')) {
    return '카드 상품에 대해 궁금한가요? 어떤 종류의 카드를 찾고 계신가요?';
  }
  return '저는 챗봇이에요! 무엇을 도와드릴까요?';
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-between;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex-grow: 1;
  padding-top: 20px;
}

.input-box {
  display: flex;
  gap: 10px;
  position: sticky;
  margin-bottom: 20px;
  margin-top: 20px;
  background: white;
  z-index: 10;
}

.input-field {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.send-button {
  padding: 10px 15px;
  background-color: #f59e0c;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.send-button:hover {
  background-color: #e68a00;
}

.chat-gradation {
  background: linear-gradient(to bottom, transparent 86px, #fffbeb 86px, #ffffff);
}
</style>
