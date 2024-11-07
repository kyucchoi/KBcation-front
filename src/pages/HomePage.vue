<script setup lang="ts">
import ShadowBox from '@/components/ShadowBox.vue';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleQuizButton = () => {
  router.push('/quiz');
};
</script>

<template>
  <Main :padded="false" :bg-gray="true">
    <div class="top">
      <div class="title">금융 퀴즈 챌린지</div>
      <div class="subtitle">매일 매일 성장하는 금융 습관!</div>
      <ShadowBox class="notice">
        <div><i class="fa-regular fa-bell"></i> 오늘의 보상</div>
        <div>5문제 모두 맞히면 1,000P 지급!</div>
      </ShadowBox>
      <Button variant="whiteYellow" size="lg" @click="handleQuizButton"
        >도전하고 포인트 받기</Button
      >
    </div>

    <div class="bottom">
      <div class="summary">
        <ShadowBox class="summary-money"
          ><div style="font-size: 14px">총 자산</div>
          <div style="font-size: 16px">10,000원</div></ShadowBox
        >
        <ShadowBox class="summary-point"
          ><div style="font-size: 14px">총 포인트</div>
          <div style="font-size: 16px">1,000P</div></ShadowBox
        >
      </div>

      <div class="recent-container">
        <div>최근 소비 내역</div>
        <ShadowBox>
          <div class="recent-list">
            <div class="recent-detail">
              <div>대구 김밥 천국</div>
              <div class="recent-date">
                <i class="fa-regular fa-calendar"></i> 24년 10월 31일 08:00
              </div>
            </div>
            <div class="recent-money">3,500원</div>
          </div>
        </ShadowBox>
        <ShadowBox>
          <div class="recent-list">
            <div class="recent-detail">
              <div>대구 김밥 천국</div>
              <div class="recent-date">
                <i class="fa-regular fa-calendar"></i> 24년 10월 31일 08:00
              </div>
            </div>
            <div class="recent-money">3,500원</div>
          </div>
        </ShadowBox>
        <ShadowBox>
          <div class="recent-list">
            <div class="recent-detail">
              <div>대구 김밥 천국</div>
              <div class="recent-date">
                <i class="fa-regular fa-calendar"></i> 24년 10월 31일 08:00
              </div>
            </div>
            <div class="recent-money">3,500원</div>
          </div>
        </ShadowBox>
      </div>
    </div>
  </Main>
</template>

<style scoped>
.top {
  width: 100%;
  background-color: var(--css-primary);
  border-radius: 0 0 16px 16px;
  padding: 36px 5.13% calc(5.13% + 4px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 32px;
  color: var(--white);
}

.subtitle {
  font-size: 16px;
  color: var(--white);
}

.notice {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  background-color: var(--css-secondary);
  color: var(--white);
}

.bottom {
  padding: 0 5.13% 40px;
  margin-top: 20px;
}

.summary {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.summary-money {
  display: flex;
  flex-direction: column;
  background-color: var(--css-light-yellow);
  gap: 8px;
}

.summary-point {
  display: flex;
  flex-direction: column;
  background-color: var(--css-primary);
  color: var(--white);
  gap: 8px;
}

.recent-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 12px;
}

.recent-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recent-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-date {
  font-size: 14px;
  color: var(--dark-gray);
}

.recent-money {
  font-size: 20px;
  color: var(--css-dark-yellow);
}
</style>
