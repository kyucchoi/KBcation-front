<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';

const banks = [
  { name: '국민은행', img: '/images/banks/kb-bank.png' },
  { name: '신한은행', img: '/images/banks/shinhan-bank.png' },
  { name: '하나은행', img: '/images/banks/hana-bank.png' },
  { name: '농협은행', img: '/images/banks/nh-bank.png' },
  { name: '우리은행', img: '/images/banks/woori-bank.png' },
  { name: '기업은행', img: '/images/banks/ibk-bank.png' }
];

const router = useRouter();
const selectedBank = ref<{ name: string; img: string } | null>(null);

const selectBank = (bank: { name: string; img: string }) => {
  selectedBank.value = bank;
};

const handleNextButtonClick = () => {
  if (selectedBank.value) {
    router.push({
      name: 'signupBankInfo',
      params: {
        bankName: encodeURIComponent(selectedBank.value.name),
        bankImg: encodeURIComponent(selectedBank.value.img)
      }
    });
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :padded="true" :headbar="true">
    <div class="bank-title">계좌 등록을 위해 <br />은행을 선택해주세요</div>

    <div class="bank-grid">
      <div
        v-for="bank in banks"
        :key="bank.name"
        class="bank-item"
        :class="{ selected: selectedBank?.name === bank.name }"
        @click="selectBank(bank)"
      >
        <img :src="bank.img" class="bank-icon" alt="bank logo" />
        <span>{{ bank.name }}</span>
      </div>
    </div>

    <Button
      size="lg"
      variant="default"
      class="next-button"
      :disabled="!selectedBank"
      @click="handleNextButtonClick"
    >
      다음
    </Button>
  </Main>
</template>

<style scoped>
.bank-title {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 40px 20px;
}

.bank-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0 20px;
}

.bank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  gap: 8px;
  border: 1px solid var(--gray);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bank-item:hover {
  border-color: var(--css-primary);
  background-color: var(--css-light-yellow);
}

.bank-item.selected {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.bank-icon {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.next-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 560px;
  margin-bottom: 20px;
}
</style>
