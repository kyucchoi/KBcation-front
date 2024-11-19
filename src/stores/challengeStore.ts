// src/stores/challengeStore.ts
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useChallengeStore = defineStore('challenge', () => {
  const maxChances = 3;
  const remainingChances = ref(maxChances);

  // 마지막 리셋 날짜 확인
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

  // 기회 사용
  const useChance = () => {
    if (remainingChances.value > 0) {
      remainingChances.value--;
      localStorage.setItem('remainingChances', String(remainingChances.value));
      return true;
    }
    return false;
  };

  // 초기화
  const initialize = () => {
    checkAndResetChances();
  };

  return {
    remainingChances,
    useChance,
    initialize
  };
});
