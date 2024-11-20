<script setup lang="ts">
import Main from '@/components/Main.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const userName = ref('');
const password = ref('');

// const kakaoURL = import.meta.env.VITE_BASE_URL;

// const navigateToNextPage = () => {
//   window.location.href = `${kakaoURL}/oauth2/authorization/kakao`;
// };

const handleLogin = async () => {
  try {
    // 입력값 검증
    if (!userName.value || !password.value) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 로그인 요청
    await userStore.login({
      userName: userName.value,
      password: password.value
    });

    // 로그인 성공 시 홈으로 이동
    router.push('/');
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
  }
};
</script>

<template>
  <Main :headbar="false" :navbar="false" :padded="true" :bg-gray="false">
    <div class="login-wrapper">
      <div class="login-container">
        <div class="login-box">
          <div class="login-icon">
            <img src="/src/icons/icon-256x256.png" alt="KBCation" class="logo" />
          </div>
          <div class="login-name">KBCation</div>
        </div>
        <!-- <div class="w-full flex flex-col items-center gap-5">
          <Button size="lg" variant="whiteBlack" class="login-kakao" @click="navigateToNextPage">
            <img class="button-icon" src="/kakao-logo.png" alt="카카오 로고" />
            카카오 로그인
          </Button>
        </div> -->

        <div class="form-container">
          <div class="input-box">
            <Label for="id-input">아이디</Label>
            <Input
              type="text"
              id="id-input"
              v-model="userName"
              placeholder="아이디를 입력해주세요"
              @keyup.enter="handleLogin"
            />
          </div>

          <div class="input-box">
            <Label for="password-input">비밀번호</Label>
            <Input
              type="password"
              id="password-input"
              v-model="password"
              placeholder="비밀번호를 입력해주세요"
              @keyup.enter="handleLogin"
            />
          </div>

          <Button variant="default" size="lg" class="login-button" @click="handleLogin">
            로그인
          </Button>

          <div class="signup-link">
            계정이 없으신가요? <span @click="$router.push('/signup')">회원가입</span>
          </div>
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
  gap: 40px;
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

.input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  width: 100%;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-button {
  width: 100%;
  margin-top: 12px;
  height: 48px;
}

.signup-link {
  text-align: center;
  font-size: 14px;
  color: var(--dark-gray);
}

.signup-link span {
  color: var(--css-dark-yellow);
  font-weight: 500;
  cursor: pointer;
}

.signup-link span:hover {
  text-decoration: underline;
}
</style>
