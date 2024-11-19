// src/stores/userStore.ts (파일명 변경)
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserData {
  id: string;
  name: string;
  // 필요한 사용자 데이터 타입 정의
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserData | null>(null);
  const isLoggedIn = ref(false);

  const login = (userData: UserData) => {
    user.value = userData;
    isLoggedIn.value = true;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      isLoggedIn.value = true;
    }
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    checkAuth
  };
});
