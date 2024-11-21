import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ChatData {
  answer: string;
}

export const useChatStore = defineStore('chat', () => {
  const chatData = ref<ChatData | null>(null);

  // 메시지 전송 함수
  const sendMessageToChatbot = async (question: string) => {
    const userStore = useUserStore();
    const memberId = userStore.user?.memberId;
    const token = userStore.user?.token;

    console.log(userStore.user);

    if (!memberId || !token) {
      console.error('사용자 정보 또는 토큰이 없습니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/chatbots/ask`,
        {
          memberId,
          question
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      chatData.value = { answer: response.data.answer };
    } catch (error) {
      console.error('챗봇 응답 받기 실패:', error);
      chatData.value = { answer: '챗봇 응답을 받을 수 없습니다.' };
    }
  };

  onMounted(() => {
    const userStore = useUserStore();
    if (!userStore.user) {
      console.error('사용자 정보가 없습니다. 로그인 페이지로 이동하세요.');
    }
  });

  return {
    chatData,
    sendMessageToChatbot
  };
});
