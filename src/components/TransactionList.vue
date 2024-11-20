<script setup lang="ts">
import { onMounted } from 'vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transactionStore';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

onMounted(async () => {
  if (userStore.user?.memberId) {
    try {
      await transactionStore.getTransactions(userStore.user.memberId);
    } catch (error) {
      console.error('거래내역 불러오기 실패:', error);
    }
  }
});
</script>

<template>
  <div class="transaction-scroll">
    <div v-if="transactionStore.isLoading" class="loading">로딩 중...</div>
    <div v-else class="transaction-list">
      <ShadowBox v-for="tx in transactionStore.recentTransactions" :key="tx.consumptionId">
        <div class="transaction-details">
          <div>{{ tx.consumptionDetails }}</div>
          <div class="amount">{{ tx.spendingAmount.toLocaleString() }}원</div>
        </div>
        <div class="date-box">
          <div class="date">
            <i class="fa-regular fa-calendar"></i>
            {{ new Date(tx.date).toLocaleString('ko-KR') }}
          </div>
        </div>
      </ShadowBox>
    </div>
  </div>
</template>

<style scoped>
.transaction-scroll {
  height: 360px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.amount {
  font-weight: 600;
  color: var(--css-dark-yellow);
}

.date-box {
  font-size: 14px;
  color: var(--nav-gray);
}

.date i {
  margin-right: 4px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: var(--dark-gray);
}
</style>
