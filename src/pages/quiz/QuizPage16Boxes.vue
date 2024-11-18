<script setup lang="ts">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const progress = ref(100); // 100%에서 시작
const isCorrect = ref(false);
const isWrong = ref(false);
const selectedAnswer = ref<number | null>(null);
const isTimeout = ref(false);
const router = useRouter();
const showAnswerDialog = ref(false);

interface Answer {
  text: string;
  isCorrect: boolean;
}

// 답안 배열 생성 (9개 버튼)
const answers = ref<Answer[]>([
  { text: '김시완', isCorrect: true },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false },
  { text: '임시완', isCorrect: false }
]);

// 배열을 랜덤하게 섞는 함수
const shuffleAnswers = () => {
  const shuffled = [...answers.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  answers.value = shuffled;
};

onMounted(() => {
  shuffleAnswers();

  const duration = 5000;
  const interval = 100;
  const step = (interval / duration) * 100;

  const timer = setInterval(() => {
    if (progress.value > 0) {
      progress.value -= step;
    } else {
      clearInterval(timer);
      if (selectedAnswer.value === null) {
        isTimeout.value = true;
        isWrong.value = true;
        selectedAnswer.value = -1;
        showAnswerDialog.value = true; // 시간 초과시 dialog 표시
      }
    }
  }, interval);
});

const handleAnswer = (index: number) => {
  if (!isTimeout.value && selectedAnswer.value === null) {
    selectedAnswer.value = index;
    if (answers.value[index].isCorrect) {
      isCorrect.value = true;
      isWrong.value = false;
    } else {
      isCorrect.value = false;
      isWrong.value = true;
    }
    showAnswerDialog.value = true; // 모든 경우에 dialog 표시
  }
};

// 성공 페이지로 이동하는 함수
const handleSuccessButton = () => {
  router.push('/quiz/success');
};

// 메인으로 돌아가는 함수
const handleGoBack = () => {
  router.push('/');
};

// 버튼 클릭 핸들러
const handleButtonClick = () => {
  if (isCorrect.value) {
    handleSuccessButton();
  } else {
    handleGoBack();
  }
};
</script>

<template>
  <Main :padded="true" :bg-gray="true">
    <div class="quiz-number">3/3</div>
    <div class="question">Tetz 반에 존재하는</div>
    <div class="question">사람은?</div>

    <Progress v-model="progress" class="timer"> </Progress>

    <!-- <div class="answer-grid">
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
        v-for="index in 15"
        :key="index"
        class="answer-button"
        variant="whiteBlack"
        :class="{ selected: selectedAnswer === index }"
        @click="handleAnswer(index)"
        :disabled="selectedAnswer !== null"
      >
        임시완
      </Button>
    </div> -->

    <div class="answer-grid">
      <Button
        v-for="(answer, index) in answers"
        :key="index"
        class="answer-button"
        variant="whiteBlack"
        :class="{
          correct: selectedAnswer !== null && answer.isCorrect,
          selected: selectedAnswer === index
        }"
        @click="handleAnswer(index)"
        :disabled="selectedAnswer !== null"
      >
        {{ answer.text }}
      </Button>
    </div>

    <div v-if="selectedAnswer !== null" class="result-section">
      <!-- <div class="correct-text">
        {{
          isTimeout ? '시간 초과되었습니다...!' : isCorrect ? '정답입니다!' : '정답이 아닙니다...!'
        }}
      </div>
      <div class="explanation">
        정답 설명:<br />
        김시완은 테츠가 가장 좋아하는 사람입니다.
      </div> -->

      <Button size="lg" variant="default" class="next-button" @click="handleButtonClick">
        {{ isCorrect ? '포인트 받기' : '돌아가기' }}
      </Button>

      <Button size="lg" variant="disabled" @click="showAnswerDialog = true">
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
              : isCorrect
                ? '정답입니다!'
                : '정답이 아닙니다...!'
          }}
        </DialogTitle>
      </DialogHeader>
      <div class="grid gap-2 py-4">
        <div>정답: 김시완</div>
        <div class="text-sm text-muted-foreground">김시완은 테츠가 가장 좋아하는 사람입니다.</div>
      </div>
      <DialogFooter>
        <!-- 정답일 경우 -->
        <!-- <div v-if="isCorrect" class="w-full">
          <Button size="lg" variant="default" @click="handleSuccessButton" class="w-full">
            포인트 받기
          </Button>
        </div> -->
        <!-- 오답이거나 시간 초과일 경우 -->
        <!-- <div v-else class="w-full">
          <Button size="lg" variant="default" @click="handleGoBack" class="w-full">
            홈으로 돌아가기
          </Button>
        </div> -->
      </DialogFooter>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.answer-button {
  height: 80px;
  font-size: 16px;
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
