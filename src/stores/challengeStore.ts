import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useUserStore } from './userStore';

export const useChallengeStore = defineStore('challenge', () => {
  const userStore = useUserStore();
  const maxChances = 3;
  const remainingChances = ref(maxChances);

  const checkAndResetChances = () => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();

    if (lastResetDate !== today) {
      remainingChances.value = maxChances;
      localStorage.setItem('lastResetDate', today);
      localStorage.setItem('remainingChances', String(maxChances));
    } else {
      const savedChances = localStorage.getItem('remainingChances');
      if (savedChances) {
        remainingChances.value = parseInt(savedChances);
      }
    }
  };

  const useChance = () => {
    if (remainingChances.value > 0) {
      remainingChances.value--;
      localStorage.setItem('remainingChances', String(remainingChances.value));
      return true;
    }
    return false;
  };

  const initialize = () => {
    checkAndResetChances();
  };

  const addPoints = async (points: number) => {
    try {
      await userStore.updatePoints(points);
      await userStore.getUserInfo();
    } catch (error) {
      console.error('포인트 업데이트 실패:', error);
      throw error;
    }
  };

  return {
    remainingChances,
    useChance,
    initialize,
    addPoints
  };
});
