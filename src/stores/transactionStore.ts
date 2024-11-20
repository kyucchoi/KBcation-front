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

  const updateTransaction = async (consumptionId: number, updatedData: Partial<Transaction>) => {
    try {
      await axios.patch(`/api/consumptions/${consumptionId}`, updatedData);
      // 수정 후 목록 다시 불러오기
      if (transactions.value[0]?.memberId) {
        await getTransactions(transactions.value[0].memberId);
      }
    } catch (error) {
      console.error('거래내역 수정 실패:', error);
      throw error;
    }
  };

  const updateTransactions = async (memberId: number, updatedData: any) => {
    try {
      await axios.post(`/api/transactions/update/${memberId}`, updatedData);
      await getTransactions(memberId);
    } catch (error) {
      console.error('거래내역 일괄 업데이트 실패:', error);
      throw error;
    }
  };

  return {
    transactions,
    recentTransactions,
    isLoading,
    getTransactions,
    updateTransaction,
    updateTransactions
  };
});
