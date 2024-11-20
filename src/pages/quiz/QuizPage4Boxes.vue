<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quizStore';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

const router = useRouter();
const quizStore = useQuizStore();
const progress = ref(100);
const selectedAnswer = ref<string | null>(null);
const isTimeout = ref(false);
const showAnswerDialog = ref(false);

onMounted(async () => {
  try {
    await quizStore.loadGameData();

    const duration = 5000;
    const interval = 100;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      if (progress.value > 0) {
        progress.value -= step;
      } else {
        clearInterval(timer);
        if (!selectedAnswer.value) {
          isTimeout.value = true;
          handleAnswer('');
          showAnswerDialog.value = true;
        }
      }
    }, interval);
  } catch (error) {
    console.error('게임 로드 실패:', error);
    router.push('/');
  }
});

const handleAnswer = async (answer: string) => {
  if (!isTimeout.value && !selectedAnswer.value) {
    selectedAnswer.value = answer;
    try {
      const isCorrect = await quizStore.submitAnswer(answer);
      showAnswerDialog.value = true;
    } catch (error) {
      console.error('답안 제출 실패:', error);
      router.push('/');
    }
  }
};

const handleNextQuiz = () => {
  if (quizStore.currentGame?.correct) {
    if (quizStore.isQuizCompleted) {
      router.push('/quiz/success');
    } else {
      router.push('/quiz/counting');
    }
  } else {
    router.push('/');
  }
};
</script>

<template>
  <Main :padded="true" :bg-gray="true">
    <div class="quiz-number">{{ quizStore.currentGame?.gameRound }}/3</div>
    <div class="question">{{ quizStore.currentGame?.quiz }}</div>

    <Progress v-model="progress" class="timer" />

    <div class="answer-grid">
      <Button
        v-for="(option, index) in quizStore.currentGame?.answerOptions"
        :key="index"
        class="answer-button"
        variant="whiteBlack"
        :class="{
          correct: selectedAnswer && option === quizStore.currentGame?.correctAnswer,
          selected: selectedAnswer === option
        }"
        @click="handleAnswer(option)"
        :disabled="selectedAnswer !== null"
      >
        {{ option }}
      </Button>
    </div>

    <div v-if="selectedAnswer" class="result-section">
      <Button
        size="lg"
        :variant="quizStore.currentGame?.correct ? 'default' : 'default'"
        class="next-button"
        @click="handleNextQuiz"
      >
        {{ quizStore.currentGame?.correct ? '다음 문제 도전하기' : '홈으로 돌아가기' }}
      </Button>

      <Button size="sm" variant="disabled" @click="showAnswerDialog = true">
        설명 다시 보기
      </Button>
    </div>
  </Main>

  <Dialog v-model:open="showAnswerDialog">
    <DialogContent class="bg-white">
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold">
          {{
            isTimeout
              ? '시간 초과되었습니다...!'
              : quizStore.currentGame?.correct
                ? '정답입니다!'
                : '정답이 아닙니다...!'
          }}
        </DialogTitle>
      </DialogHeader>
      <div class="grid gap-2 py-4">
        <div>정답: {{ quizStore.currentGame?.correctAnswer }}</div>
        <div class="text-sm text-muted-foreground">
          {{ quizStore.currentGame?.answerExplanation }}
        </div>
      </div>
    </DialogContent>
  </Dialog>
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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px); /* 좌우 여백 20px씩 */
  max-width: 560px; /* 600px - 40px */
  margin-top: 0;
  margin-bottom: 20px;
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
