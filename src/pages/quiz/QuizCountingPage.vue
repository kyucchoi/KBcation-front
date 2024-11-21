<script setup lang="ts">
import Main from '@/components/Main.vue';
import { useQuizStore } from '@/stores/quizStore';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const count = ref(3);
const router = useRouter();
const quizStore = useQuizStore();

// 현재 단계에 따라 다음 퀴즈 페이지 결정
// const getNextQuizPage = () => {
//   if (route.query.next === 'quiz9Boxes') {
//     return '/quiz2'; // QuizPage9Boxes로 이동
//   } else if (route.query.next === 'quiz16Boxes') {
//     return '/quiz3'; // QuizPage16Boxes로 이동
//   }
//   return '/quiz1'; // 기본값: QuizPage4Boxes로 이동
// };

// onMounted(() => {
//   const timer = setInterval(() => {
//     if (count.value > 0) {
//       count.value--;
//     } else {
//       clearInterval(timer);
//       setTimeout(() => {
//         router.push(getNextQuizPage());
//       }, 0);
//     }
//   }, 1000);
// });

onMounted(async () => {
  const timer = setInterval(() => {
    if (count.value > 0) {
      count.value--;
    } else {
      clearInterval(timer);
      setTimeout(() => {
        router.push('/quiz1');
      }, 0);
    }
  }, 1000);
});

// const getRewardText = () => {
//   if (!route.query.next) {
//     return '3단계 모두 성공하고 1,000P 받아요!';
//   }
//   if (route.query.next === 'quiz9Boxes') {
//     return '대단하군요! 조금만 더 힘내세요!';
//   }
//   if (route.query.next === 'quiz16Boxes') {
//     return '멋져요! 마지막까지 화이팅';
//   }
// };

const getRewardText = () => {
  switch (quizStore.successCount) {
    case 0:
      return '3단계 모두 성공하고 1,000P 받아요!';
    case 1:
      return '대단하군요! 조금만 더 힘내세요!';
    case 2:
      return '멋져요! 마지막까지 화이팅';
    default:
      return '3단계 모두 성공하고 1,000P 받아요!';
  }
};
</script>

<template>
  <Main :padded="false" :bg-gray="false">
    <div class="quiz-wrapper">
      <div class="quiz-container">
        <div class="guide-text">금융 지식을 위해</div>

        <div class="title-container">
          <div class="title">문제의 정확한 답을</div>
          <div class="title">찾아주세요</div>
        </div>

        <div class="reward-text">
          {{ getRewardText() }}
        </div>

        <div class="circle-container">
          <div class="number-text">{{ count }}</div>
        </div>
      </div>
    </div>
  </Main>
</template>

<style scoped>
.quiz-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 5.13%;
}

.guide-text {
  color: var(--dark-gray);
  font-size: 16px;
  margin-bottom: 16px;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  color: var(--black);
  font-size: 28px;
  line-height: 1.2;
}

.reward-text {
  color: var(--dark-gray);
  font-size: 20px;
  margin-bottom: 40px;
}

.circle-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--css-dark-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-text {
  color: var(--white);
  font-size: 40px;
}

.circle-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--css-dark-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

.number-text {
  color: var(--white);
  font-size: 40px;
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

/* 숫자가 바뀔 때 애니메이션 효과 */
/* .circle-container:hover {
  transform: scale(1.1);
} */

/* .number-text:hover {
  transform: scale(1.1);
} */
</style>
