<script setup lang="ts">
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';

const kakaoURL = import.meta.env.VITE_BASE_URL;

const navigateToNextPage = () => {
  window.location.href = `${kakaoURL}/oauth2/authorization/kakao`;
};
</script>

<template>
  <Main :headbar="false" :navbar="false" :padded="false" :bg-gray="false">
    <div class="login-wrapper">
      <div class="login-container">
        <div class="login-box">
          <div class="login-icon">
            <img src="/src/icons/icon-256x256.png" alt="KBCation" class="logo" />
          </div>
          <div class="login-name">KBCation</div>
        </div>
        <div class="w-full flex flex-col items-center gap-5">
          <Button size="lg" variant="whiteBlack" class="login-kakao" @click="navigateToNextPage">
            <img class="button-icon" src="/kakao-logo.png" alt="카카오 로고" />
            카카오 로그인
          </Button>
        </div>
      </div>
    </div>
  </Main>
</template>

<style scoped>
.login-wrapper {
  min-height: 88vh;
  /* background: linear-gradient(to bottom, #fff6d3, white); */
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-icon {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 24px;
  object-fit: cover;
}

.login-name {
  font-size: 20px;
  margin-top: 8px;
  font-weight: 600;
  color: var(--css-dark-yellow);
}

.login-kakao {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 54px;
  background-color: #fee500;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-icon {
  position: absolute;
  left: 18px;
  width: 24px;
  height: 24px;
}
</style>
