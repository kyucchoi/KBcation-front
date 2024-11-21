// stores/chatStore.ts
import { defineStore } from 'pinia';
import { useUserStore } from './userStore'; // userStore 가져오기
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
    const userStore = useUserStore(); // userStore 인스턴스 가져오기
    const memberId = userStore.user?.memberId; // userStore에서 memberId 가져오기
    const token = userStore.user?.token; // userStore에서 token 가져오기

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
            Authorization: `Bearer ${token}` // userStore에서 가져온 token을 헤더에 추가
          }
        }
      );

      // 응답 데이터 처리
      chatData.value = { answer: response.data.answer };
    } catch (error) {
      console.error('챗봇 응답 받기 실패:', error);
      // 오류 메시지 설정
      chatData.value = { answer: '챗봇 응답을 받을 수 없습니다.' };
    }
  };

  // onMounted Hook을 사용하여 페이지 로드시 초기화 작업
  onMounted(() => {
    const userStore = useUserStore();
    if (!userStore.user) {
      console.error('사용자 정보가 없습니다. 로그인 페이지로 이동하세요.');
      // 필요한 경우 로그인 페이지로 리디렉션하거나 다른 처리를 할 수 있습니다.
    }
  });

  return {
    chatData,
    sendMessageToChatbot
  };
});
