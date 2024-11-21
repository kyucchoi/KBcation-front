<script setup lang="ts">
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';
import { useQuizStore } from '@/stores/quizStore';

const router = useRouter();
const userStore = useUserStore();
const quizStore = useQuizStore();
const QUIZ_REWARD = 1000;

onMounted(async () => {
  try {
    await userStore.getUserInfo();

    if (userStore.user && typeof userStore.user.point === 'number') {
      const totalPoint = userStore.user.point + QUIZ_REWARD;
      await userStore.updatePoints(totalPoint);
    } else {
      console.error('사용자 정보를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('포인트 업데이트 실패:', error);
  }
});

const handleOut = async () => {
  try {
    await userStore.getUserInfo();
    quizStore.resetRound();
    router.push('/');
  } catch (error) {
    console.error('사용자 정보 갱신 실패:', error);
    router.push('/');
  }
};
</script>

<template>
  <Main :padded="false" :bg-gray="false">
    <div class="success-wrapper">
      <div class="success-container">
        <div class="point">1,000P</div>
        <div class="message-container">
          <div class="message">축하해요! 금융 퀴즈</div>
          <div class="message">1,000P 받았어요</div>
        </div>
      </div>
    </div>

    <Button variant="default" class="next-button" size="lg" @click="handleOut">나가기</Button>
  </Main>
</template>

<style scoped>
.success-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.point {
  color: var(--css-dark-yellow);
  font-size: 48px;
}

.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.message {
  color: var(--black);
  font-size: 24px;
}

.next-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px); /* 좌우 여백 20px씩 */
  max-width: 560px; /* 600px - 40px */
  margin-top: 0;
  margin-bottom: 20px;
}

@media (min-width: 600px) {
  .next-button {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    border-radius: 20px;
  }
}
</style>
