import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useUserStore } from './userStore';

export const useChallengeStore = defineStore('challenge', () => {
  const userStore = useUserStore();
  const maxChances = 3;
  const remainingChances = ref(maxChances);

  const checkAndResetChances = () => {
    const memberId = userStore.user?.memberId;
    if (!memberId) return;

    const lastResetDate = localStorage.getItem(`lastResetDate_${memberId}`);
    const today = new Date().toDateString();

    if (lastResetDate !== today) {
      remainingChances.value = maxChances;
      localStorage.setItem(`lastResetDate_${memberId}`, today);
      localStorage.setItem(`remainingChances_${memberId}`, String(maxChances));
    } else {
      const savedChances = localStorage.getItem(`remainingChances_${memberId}`);
      if (savedChances) {
        remainingChances.value = parseInt(savedChances);
      }
    }
  };

  const useChance = () => {
    const memberId = userStore.user?.memberId;
    if (!memberId) return false;

    if (remainingChances.value > 0) {
      remainingChances.value--;
      localStorage.setItem(`remainingChances_${memberId}`, String(remainingChances.value));
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
