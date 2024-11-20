import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

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

  const resetQuiz = () => {
    successCount.value = 0;
    currentGame.value = null;
  };

  const loadGameData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/games/${successCount.value + 1}`);
      currentGame.value = response.data;
    } catch (error) {
      console.error('게임 데이터 불러오기 실패:', error);
      throw error;
    }
  };

  const submitAnswer = async (answer: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/games/${currentGame.value?.gameId}`, {
        yourAnswer: answer
      });
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
    loadGameData,
    submitAnswer,
    isQuizCompleted
  };
});
