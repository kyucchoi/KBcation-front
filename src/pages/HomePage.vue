<script setup lang="ts">
import ShadowBox from '@/components/ShadowBox.vue';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useChallengeStore } from '@/stores/challengeStore';
import TransactionList from '@/components/TransactionList.vue';

const router = useRouter();
const themeStore = useThemeStore();

const userStore = useUserStore(); // user store 사용
const challengeStore = useChallengeStore();

// 로그아웃 함수 추가
const handleLogout = () => {
  userStore.logout(); // store에서 사용자 정보 삭제
  router.push('/login'); // 로그인 페이지로 이동
};

onMounted(async () => {
  themeStore.setThemeColor('#FBBF24');
  challengeStore.initialize();

  // 로그인 상태 체크 추가
  userStore.checkAuth();

  // 사용자 정보 조회
  if (userStore.isLoggedIn) {
    try {
      const userInfo = await userStore.getUserInfo();
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    }
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    router.push('/login');
  }
});

const handleQuizButton = () => {
  if (challengeStore.useChance()) {
    router.push('/quiz/counting');
  } else {
    // 기회가 없을 때 처리 (예: 알림 표시)
    alert('오늘의 도전 기회를 모두 사용했습니다. 내일 다시 도전해주세요!');
  }
};

const handleChatBot = () => {
  router.push('/chatBot');
};
</script>

<template>
  <Main :headbar="false" :padded="false" :bg-gray="true">
    <div class="top">
      <div class="user">
        안녕하세요, {{ userStore.user?.fullName }}님
        <div>
          <i class="fa-solid fa-right-from-bracket" @click="handleLogout"></i>
        </div>
      </div>

      <div class="header-content">
        <div>
          <div class="title">금융 퀴즈 챌린지</div>
          <div class="subtitle">매일 매일 성장하는 금융 습관!</div>
        </div>
        <div class="chance-card">
          <div class="chance-icon">🎁</div>
          <div class="chance-text">
            <div class="chance-label">오늘의 기회</div>
            <div class="chance-amount">{{ challengeStore.remainingChances }}회</div>
          </div>
        </div>
      </div>
      <Button variant="whiteYellow" size="lg" class="challenge-button" @click="handleQuizButton">
        도전하고 포인트 받기
      </Button>
    </div>

    <div class="content">
      <!-- <div class="flex justify-between p-4">
        <Button variant="default" @click="$router.push('/login')">로그인</Button>
        <Button variant="default" @click="$router.push('/signup')">회원가입</Button>
      </div> -->

      <div class="dashboard">
        <div class="balance-cards">
          <ShadowBox class="balance-card">
            <div>
              <div class="balance-title">
                <div class="balance-icon">💰</div>
                <div class="balance-label">총 자산</div>
              </div>
              <div class="balance-amount">10,000원</div>
            </div>
          </ShadowBox>
          <ShadowBox class="balance-card">
            <div>
              <div class="balance-title">
                <div class="balance-icon">⭐</div>
                <div class="balance-label">총 포인트</div>
              </div>
              <div class="balance-amount">{{ userStore.user?.point }}P</div>
            </div>
          </ShadowBox>
        </div>

        <div>
          <h2 class="section-title">최근 소비 내역</h2>
          <TransactionList />

          <!-- <div class="transaction-scroll">
            <div class="transaction-list">
              <ShadowBox>
                <div class="transaction-details">
                  <div>대구 김밥 천국</div>
                  <div class="amount">3,500원</div>
                </div>
                <div class="date-box">
                  <div class="date">
                    <i class="fa-regular fa-calendar"></i>
                    24년 10월 31일 08:00
                  </div>
                </div>
              </ShadowBox>
              <ShadowBox>
                <div class="transaction-details">
                  <div>대구 김밥 천국</div>
                  <div class="amount">3,500원</div>
                </div>
                <div class="date-box">
                  <div class="date">
                    <i class="fa-regular fa-calendar"></i>
                    24년 10월 31일 08:00
                  </div>
                </div>
              </ShadowBox>
              <ShadowBox>
                <div class="transaction-details">
                  <div>대구 김밥 천국</div>
                  <div class="amount">3,500원</div>
                </div>
                <div class="date-box">
                  <div class="date">
                    <i class="fa-regular fa-calendar"></i>
                    24년 10월 31일 08:00
                  </div>
                </div>
              </ShadowBox>
            </div>
          </div> -->
        </div>
      </div>

      <Button class="chatbot-button" @click="handleChatBot">
        <i class="fa-solid fa-comments"></i>
      </Button>
    </div>
  </Main>
</template>

<style scoped>
.top {
  background: linear-gradient(165deg, var(--css-primary) 30%, #ff7802 100%);
  border-radius: 0 0 24px 24px;
  padding: 4px 24px;
  padding-bottom: 32px;
}

.user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* padding-right: 20px; */
  font-size: 20px;
  color: var(--white);
  margin-bottom: 12px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title {
  font-size: 28px;
  color: var(--white);
}

.subtitle {
  color: var(--white);
  margin-top: 8px;
}

.chance-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chance-icon {
  font-size: 24px;
}

.chance-text {
  display: flex;
  flex-direction: column;
}

.chance-label {
  display: flex;
  font-size: 12px;
  color: var(--white);
}

.chance-amount {
  display: flex;
  font-weight: 600;
  color: var(--white);
}

.challenge-button {
  width: 100%;
}

.content {
  position: relative;
  z-index: 1;
}

.dashboard {
  padding: 24px;
}

.balance-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.balance-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: right;
  gap: 8px;
}

.balance-icon {
  font-size: 24px;
}

.balance-label {
  font-size: 14px;
  color: var(--dark-gray);
}

.balance-amount {
  font-size: 18px;
  font-weight: 600;
  text-align: right;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

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

.chatbot-button {
  position: fixed;
  bottom: 40px;
  right: 30px;
  transition: transform 0.4s ease;
  opacity: 0.8;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.chatbot-botton i {
  font-size: 24px;
}

:deep(.main-frame) {
  overscroll-behavior-y: none;
}
</style>
