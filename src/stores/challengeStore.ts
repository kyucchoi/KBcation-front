import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useChallengeStore = defineStore('challenge', () => {
  const maxChances = 3;
  const remainingChances = ref(maxChances);
  const totalPoints = ref(0); // 포인트 상태 추가

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

    // localStorage에서 포인트 불러오기
    const savedPoints = localStorage.getItem('totalPoints');
    if (savedPoints) {
      totalPoints.value = parseInt(savedPoints);
    }
  };

  const addPoints = (points: number) => {
    totalPoints.value += points;
    localStorage.setItem('totalPoints', String(totalPoints.value));
  };

  return {
    remainingChances,
    totalPoints, // 포인트 상태 export
    useChance,
    initialize,
    addPoints // 포인트 추가 함수 export
  };
});
