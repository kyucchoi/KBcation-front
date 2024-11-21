import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Transaction {
  consumptionId: number;
  memberId: number;
  consumptionDetails: string;
  category: string;
  spendingAmount: number;
  date: string;
}

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref(false);
  const latestBalance = ref<number>(0);

  const recentTransactions = computed(() => {
    return transactions.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const getTransactions = async (memberId: number) => {
    isLoading.value = true;
    try {
      const response = await axios.get(`/api/consumptions/member/${memberId}`);
      transactions.value = response.data;
    } catch (error) {
      console.error('거래내역 불러오기 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getLatestBalance = async (memberId: number) => {
    try {
      const response = await axios.get(`/api/consumptions/latest-balance/${memberId}`);
      latestBalance.value = response.data;
    } catch (error) {
      console.error('최신 잔액 조회 실패:', error);
      throw error;
    }
  };

  return {
    transactions,
    recentTransactions,
    latestBalance,
    isLoading,
    getTransactions,
    getLatestBalance
  };
});
