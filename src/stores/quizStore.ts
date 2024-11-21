import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { useUserStore } from './userStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Game {
  gameId: number;
  gameRound: number;
  quiz: string;
  answerOptions: string[];
  correctAnswer: string;
  yourAnswer: string;
  answerExplanation: string;
  correct: boolean;
}

export const useQuizStore = defineStore('quiz', () => {
  const successCount = ref(0);
  const currentGame = ref<Game | null>(null);

  const userStore = useUserStore();

  const setSuccessCount = (count: number) => {
    successCount.value = count;
  };

  const resetQuiz = () => {
    successCount.value = 0;
    currentGame.value = null;
  };

  const startGame = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/games/start/${userStore.user?.memberId}`);
      currentGame.value = response.data;
    } catch (error) {
      console.error('게임 시작 실패:', error);
      throw error;
    }
  };

  const loadNextGame = async () => {
    if (!currentGame.value?.gameId) return;

    try {
      const response = await axios.post(`${BASE_URL}/api/games/${currentGame.value.gameId}/next`);
      currentGame.value = response.data;
      successCount.value = response.data.gameRound - 1; // 게임 라운드에 따라 successCount 업데이트
    } catch (error) {
      console.error('다음 게임 로드 실패:', error);
      throw error;
    }
  };

  const submitAnswer = async (answer: string) => {
    if (!currentGame.value?.gameId) return false;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/games/${currentGame.value.gameId}/submit`,
        { yourAnswer: answer }
      );
      currentGame.value = response.data;

      if (response.data.correct) {
        successCount.value++;
      }

      return response.data.correct;
    } catch (error) {
      console.error('답안 제출 실패:', error);
      throw error;
    }
  };

  const isQuizCompleted = computed(() => successCount.value >= 3);

  return {
    successCount,
    currentGame,
    resetQuiz,
    startGame,
    loadNextGame,
    submitAnswer,
    isQuizCompleted,
    setSuccessCount
  };
});
