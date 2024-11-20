import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface UserData {
  memberId: number;
  token: string;
  type: string;
  userName: string;
  fullName: string;
  gender: string;
  birth: string;
  point: number;
  connectedId: string;
}

interface LoginPayload {
  userName: string;
  password: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserData | null>(null);
  const isLoggedIn = ref(false);

  const login = async (payload: LoginPayload) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);
      const userData = response.data;
      user.value = userData;
      isLoggedIn.value = true;
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));

      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      axios.defaults.baseURL = BASE_URL;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`);
      user.value = null;
      isLoggedIn.value = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      user.value = JSON.parse(savedUser);
      isLoggedIn.value = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.baseURL = BASE_URL;
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/${user.value?.memberId}`);
      user.value = response.data;
      return response.data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
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
