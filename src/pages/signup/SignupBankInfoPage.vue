<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';

const router = useRouter();
const route = useRoute();

const bankInfo = computed(() => {
  return {
    bankName: decodeURIComponent(route.params.bankName as string) || '',
    bankImg: decodeURIComponent(route.params.bankImg as string) || ''
  };
});

const accountNumber = ref('');
const accountId = ref('');
const accountPassword = ref('');
const allTermsChecked = ref(false);
const privacyTerms = ref(false);
const serviceTerms = ref(false);
const thirdPartyTerms = ref(false);

// const handlePasswordInput = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   // 숫자만 입력 가능하도록
//   input.value = input.value.replace(/[^0-9]/g, '');
//   // 4자리로 제한
//   if (input.value.length > 4) {
//     input.value = input.value.slice(0, 4);
//   }
//   accountPassword.value = input.value;
// };

// 폼 유효성 검사 - 모든 필드가 입력되었는지 확인
const isFormValid = computed(
  () =>
    accountNumber.value.trim() !== '' &&
    accountId.value !== '' &&
    accountPassword.value !== '' &&
    // 모든 필수 약관에 동의
    privacyTerms.value &&
    serviceTerms.value &&
    thirdPartyTerms.value
);

// 전체 약관 동의 처리
const handleAllTermsChange = (checked: boolean) => {
  allTermsChecked.value = checked;
  privacyTerms.value = checked;
  serviceTerms.value = checked;
  thirdPartyTerms.value = checked;
};

// 개별 약관 동의 시 전체 동의 상태 체크
const checkAllTerms = () => {
  allTermsChecked.value = privacyTerms.value && serviceTerms.value && thirdPartyTerms.value;
};

const handleNextButtonClick = () => {
  router.push({
    path: '/signup/success',
    query: {
      bankName: bankInfo.value.bankName,
      bankImg: bankInfo.value.bankImg,
      accountNumber: accountNumber.value
    }
  });
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :padded="true" :headbar="true">
    <div class="bank-header">
      <img :src="bankInfo.bankImg" class="bank-icon" alt="bank logo" />
      <div>{{ bankInfo.bankName }}</div>
    </div>

    <div class="form-container">
      <div class="input-group">
        <div class="input-field">
          <Label for="bank-num-input">계좌 번호</Label>
          <Input
            type="text"
            inputmode="numeric"
            id="bank-num-input"
            v-model="accountNumber"
            placeholder="계좌번호를 입력해주세요"
          />
        </div>

        <div class="input-field">
          <Label for="bank-id-input">아이디</Label>
          <Input
            type="text"
            inputmode="text"
            id="bank-id-input"
            v-model="accountId"
            placeholder="인터넷 뱅킹 아이디를 입력해주세요"
          />
        </div>

        <div class="input-field">
          <Label for="bank-password-input">아이디 비밀번호</Label>
          <Input
            type="password"
            inputmode="text"
            id="bank-password-input"
            v-model="accountPassword"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>

      <div class="terms-section">
        <div class="term-item">
          <Checkbox
            id="all-terms"
            v-model:checked="allTermsChecked"
            @update:checked="handleAllTermsChange"
          />
          <label for="all-terms" class="term-label"> 전체 이용 약관 동의 </label>
        </div>

        <div class="divider" />

        <div class="term-item">
          <Checkbox
            id="privacy-terms"
            v-model:checked="privacyTerms"
            @update:checked="checkAllTerms"
          />
          <label for="privacy-terms" class="term-label"> [필수] 개인정보 수집 및 이용 동의 </label>
        </div>

        <div class="term-item">
          <Checkbox
            id="service-terms"
            v-model:checked="serviceTerms"
            @update:checked="checkAllTerms"
          />
          <label for="service-terms" class="term-label"> [필수] 금융 서비스 이용약관 동의 </label>
        </div>

        <div class="term-item">
          <Checkbox
            id="third-party-terms"
            v-model:checked="thirdPartyTerms"
            @update:checked="checkAllTerms"
          />
          <label for="third-party-terms" class="term-label"> [필수] 제3자 정보 제공 동의 </label>
        </div>
      </div>
    </div>

    <Button
      size="lg"
      variant="default"
      class="next-button"
      :disabled="!isFormValid"
      @click="handleNextButtonClick"
    >
      다음
    </Button>
  </Main>
</template>

<style scoped>
.bank-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 60px 20px 40px;
  font-size: 28px;
  font-weight: 600;
}

.bank-icon {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 1px solid var(--gray);
}

.form-container {
  padding: 0 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 60px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terms-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.term-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.term-label {
  font-size: 14px;
  font-weight: 600;
}

.divider {
  height: 1px;
  background-color: var(--nav-gray);
  margin: 8px 0;
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
