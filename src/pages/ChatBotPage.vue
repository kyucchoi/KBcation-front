<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '../stores/chatStore'; // Pinia store import
import ChattingUserInputBox from '../components/ChattingUserInputBox.vue';
import ChattingBotResponseBox from '../components/ChattingBotResponseBox.vue';
import Main from '@/components/Main.vue';
import HeadBar from '@/components/HeadBar.vue';

const router = useRouter();
const chatStore = useChatStore();

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
const handleUserMessage = async () => {
  if (userInput.value.trim() === '') return;

  // 사용자 메시지 추가
  messages.value.push({
    sender: 'user',
    message: userInput.value
  });

  const currentInput = userInput.value;
  userInput.value = ''; // 입력창 초기화

  // 백엔드로 질문을 보내고 응답 받기
  await chatStore.sendMessageToChatbot(currentInput);

  // 챗봇 응답 추가 (응답이 없을 경우 대체 메시지 추가)
  const botMessage = chatStore.chatData?.answer || '죄송합니다. 챗봇이 응답하지 않았어요.';
  messages.value.push({
    sender: 'bot',
    message: botMessage
  });

  // 스크롤 최하단으로 이동
  nextTick(() => {
    const chatMessagesElement = chatMessages.value;
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  });
};

onMounted(() => {
  // 백엔드 완성되면 사용 가능
  // fetchChatData();
});
</script>

<template>
  <HeadBar :back-button="true" :bg-gray="false"> 챗봇 </HeadBar>
  <Main :headbar="true" :padded="true" class="chat-gradation">
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

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-top: 8px;
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
  margin-bottom: 40px;
  margin-top: 20px;
  background: white;
  z-index: 10;
}

.input-field {
  min-width: 0;
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.send-button {
  padding: 10px 15px;
  background-color: #f59e0c;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  width: 60px;
}

.send-button:hover {
  background-color: #e68a00;
}

.chat-gradation {
  background: linear-gradient(to bottom, #fffbeb, #ffffff);
}
</style>
