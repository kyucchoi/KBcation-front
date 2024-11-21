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
  const currentRound = ref(1);
  const currentGame = ref<Game | null>(null);
  const userStore = useUserStore();

  const resetQuiz = () => {
    // currentRound.value = 1;
    currentGame.value = null;
  };

  const resetRound = () => {
    currentRound.value = 1;
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
      currentRound.value++; // 다음 게임 불러오기 전에 라운드 증가
      const response = await axios.post(`${BASE_URL}/api/games/${currentGame.value.gameId}/next`);
      currentGame.value = response.data;
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
      return response.data.correct;
    } catch (error) {
      console.error('답안 제출 실패:', error);
      throw error;
    }
  };

  const isQuizCompleted = computed(() => currentRound.value === 3);

  return {
    currentRound,
    currentGame,
    resetQuiz,
    resetRound,
    startGame,
    loadNextGame,
    submitAnswer,
    isQuizCompleted
  };
});
