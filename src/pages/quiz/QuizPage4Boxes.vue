<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quizStore';
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const router = useRouter();
const quizStore = useQuizStore();
const progress = ref(100);
const selectedAnswer = ref<string | null>(null);
const isTimeout = ref(false);
const showAnswerDialog = ref(false);
const isLoading = ref(true);

onMounted(async () => {
  try {
    await quizStore.startGame();
    isLoading.value = false;

    const duration = 10000;
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
    console.error('게임 시작 실패:', error);
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

const handleNextQuiz = async () => {
  if (!quizStore.currentGame?.correct || isTimeout.value) {
    quizStore.resetRound(); // 홈으로 돌아갈 때 라운드 초기화
    router.push('/');
    return;
  }

  if (quizStore.currentRound === 3) {
    router.push('/quiz/success');
  } else {
    try {
      await quizStore.loadNextGame();
      router.push('/quiz/counting');
    } catch (error) {
      console.error('다음 게임 로드 실패:', error);
      quizStore.resetRound();
      router.push('/');
    }
  }
};
</script>

<template>
  <Main :padded="true" :bg-gray="true">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">문제를 불러오는 중...</div>
    </div>

    <template v-else>
      <div class="quiz-number">{{ quizStore.currentRound }}/3</div>
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
          :disabled="selectedAnswer !== null || isTimeout"
        >
          {{ option }}
        </Button>
      </div>

      <div v-if="selectedAnswer || isTimeout" class="result-section">
        <Button size="lg" variant="default" class="next-button" @click="handleNextQuiz">
          {{
            quizStore.currentGame?.correct && !isTimeout ? '다음 문제 도전하기' : '홈으로 돌아가기'
          }}
        </Button>

        <Button size="sm" variant="disabled" @click="showAnswerDialog = true">
          설명 다시 보기
        </Button>
      </div>
    </template>

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
  padding-bottom: 80px;
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
  width: calc(100% - 40px);
  max-width: 560px;
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--css-light-yellow);
  border-top: 4px solid var(--css-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--dark-gray);
  font-size: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
