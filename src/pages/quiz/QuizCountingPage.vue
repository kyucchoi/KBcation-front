<script setup lang="ts">
import Main from '@/components/Main.vue';
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

        <div class="reward-text">5단계까지 성공하면 포인트 10,000P</div>

        <div class="circle-container">
          <div class="number-text">3</div>
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
</style>
