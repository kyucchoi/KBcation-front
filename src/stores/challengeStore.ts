import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './userStore';
import axios from 'axios';

export const useChallengeStore = defineStore('challenge', () => {
  const userStore = useUserStore();
  const maxChances = 3;
  const remainingChances = ref(maxChances);
  const lastActivityTime = ref(Date.now());

  // 백엔드 동기화 필요 여부 체크
  const needsSync = () => {
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastActivityTime.value;
    return inactiveTime > 30 * 60 * 1000; // 30분 이상 비활성
  };

  // 백엔드에서 도전 횟수 조회
  const fetchChances = async () => {
    try {
      const response = await axios.get(`/api/chances/${userStore.user?.memberId}`);
      remainingChances.value = response.data.chances;
      updateLocalStorage();
    } catch (error) {
      console.error('도전 횟수 조회 실패:', error);
    }
  };

  // 백엔드에 도전 횟수 업데이트
  const syncChances = async () => {
    try {
      await axios.put(`/api/chances/${userStore.user?.memberId}`, {
        chances: remainingChances.value
      });
      updateLocalStorage();
    } catch (error) {
      console.error('도전 횟수 동기화 실패:', error);
    }
  };

  // localStorage 업데이트
  const updateLocalStorage = () => {
    const memberId = userStore.user?.memberId;
    if (!memberId) return;

    localStorage.setItem(`lastResetDate_${memberId}`, new Date().toDateString());
    localStorage.setItem(`remainingChances_${memberId}`, String(remainingChances.value));
    lastActivityTime.value = Date.now();
  };

  // 도전 횟수 초기화 및 동기화 체크
  const checkAndResetChances = async () => {
    const memberId = userStore.user?.memberId;
    if (!memberId) return;

    const lastResetDate = localStorage.getItem(`lastResetDate_${memberId}`);
    const today = new Date().toDateString();

    // 날짜가 바뀌었거나 장시간 비활성 상태였다면 백엔드와 동기화
    if (lastResetDate !== today || needsSync()) {
      await fetchChances();
    } else {
      const savedChances = localStorage.getItem(`remainingChances_${memberId}`);
      if (savedChances) {
        remainingChances.value = parseInt(savedChances);
      }
    }
  };

  // 도전 횟수 사용
  const useChance = async () => {
    const memberId = userStore.user?.memberId;
    if (!memberId) return false;

    if (needsSync()) {
      await checkAndResetChances();
    }

    if (remainingChances.value > 0) {
      remainingChances.value--;
      updateLocalStorage();

      // 마지막 기회를 사용했거나 30분마다 백엔드 동기화
      if (remainingChances.value === 0 || needsSync()) {
        await syncChances();
      }
      return true;
    }
    return false;
  };

  const initialize = async () => {
    await checkAndResetChances();
  };

  // 포인트 적립
  const addPoints = async (points: number) => {
    try {
      await userStore.updatePoints(points);
      await userStore.getUserInfo();
    } catch (error) {
      console.error('포인트 업데이트 실패:', error);
      throw error;
    }
  };

  // 앱 종료 시 동기화 시도
  window.addEventListener('beforeunload', () => {
    if (needsSync()) {
      syncChances();
    }
  });

  return {
    remainingChances,
    useChance,
    initialize,
    addPoints
  };
});
