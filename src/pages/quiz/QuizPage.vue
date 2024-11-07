<script setup lang="ts">
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import { ref, onMounted } from 'vue';

const progress = ref(100); // 100%에서 시작
const isCorrect = ref(false);
const isWrong = ref(false);
const selectedAnswer = ref<number | null>(null);
const isTimeout = ref(false);

onMounted(() => {
  // 10초 동안 줄어드는 타이머 (100% -> 0%)
  const duration = 1500; // 1.5초
  const interval = 100; // 0.1초마다 업데이트
  const step = (interval / duration) * 100;

  const timer = setInterval(() => {
    if (progress.value > 0) {
      progress.value -= step;
    } else {
      clearInterval(timer);
      if (selectedAnswer.value === null) {
        // 시간 초과 && 답 선택 안 함
        isTimeout.value = true;
        isWrong.value = true;
        selectedAnswer.value = -1; // 시간 초과용 특별 값
      }
    }
  }, interval);
});

const handleAnswer = (index: number) => {
  if (!isTimeout.value) {
    // 시간 초과가 아닐 때만 답안 선택 가능
    selectedAnswer.value = index;
    if (index === 0) {
      isCorrect.value = true;
      isWrong.value = false;
    } else {
      isCorrect.value = false;
      isWrong.value = true;
    }
  }
};
</script>

<template>
  <Main :padded="true" :bg-gray="true">
    <div class="quiz-number">1/5</div>
    <div class="question">Tetz 반에 존재하는</div>
    <div class="question">사람은?</div>

    <Progress v-model="progress" class="timer"> </Progress>

    <div class="answer-grid">
      <Button
        class="answer-button"
        variant="whiteBlack"
        :class="{
          correct: isCorrect || (isWrong && selectedAnswer !== 0),
          selected: selectedAnswer === 0
        }"
        @click="handleAnswer(0)"
        :disabled="selectedAnswer !== null"
      >
        김시완
      </Button>
      <Button
        v-for="index in 3"
        :key="index"
        class="answer-button"
        variant="whiteBlack"
        :class="{ selected: selectedAnswer === index }"
        @click="handleAnswer(index)"
        :disabled="selectedAnswer !== null"
      >
        임시완
      </Button>
    </div>

    <div v-if="selectedAnswer !== null" class="result-section">
      <div class="correct-text">
        {{
          isTimeout ? '시간 초과되었습니다...!' : isCorrect ? '정답입니다!' : '정답이 아닙니다...!'
        }}
      </div>
      <div class="explanation">
        정답 설명:<br />
        김시완은 테츠가 가장 좋아하는 사람입니다.
      </div>

      <Button size="lg" :variant="isCorrect ? 'default' : 'default'" class="next-button">
        {{ isCorrect ? '2단계 도전하기' : '돌아가기' }}
      </Button>
    </div>
  </Main>
</template>

<style scoped>
.quiz-number {
  margin-top: 36px;
  margin-bottom: 12px;
  font-size: 20px;
}

.question {
  font-size: 24px;
}

.timer {
  margin-top: 20px;
  margin-bottom: 40px;
}

.answer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.answer-button {
  height: 140px;
  font-size: 20px;
}

.correct {
  border: 2px solid var(--css-primary);
}

.selected {
  background-color: var(--css-light-yellow);
  border: 2px solid var(--css-primary);
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-bottom: 80px; /* 버튼 높이 + 여유 공간 */
}

.correct-text {
  color: var(--dark-gray);
  font-size: 16px;
}

.explanation {
  font-size: 14px;
  color: var(--dark-gray);
}

.next-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px); /* 좌우 여백 20px씩 */
  max-width: 560px; /* 600px - 40px */
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 16px;
}

.answer-button:disabled {
  opacity: 1;
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
