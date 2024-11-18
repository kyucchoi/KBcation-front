import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizCountingPage from '@/pages/quiz/QuizCountingPage.vue';
import QuizSuccessPage from '@/pages/quiz/QuizSuccessPage.vue';
import ChatBotPage from '@/pages/ChatBotPage.vue';
import QuizPage9Boxes from '@/pages/quiz/QuizPage9Boxes.vue';
import QuizPage16Boxes from '@/pages/quiz/QuizPage16Boxes.vue';
import QuizPage4Boxes from '@/pages/quiz/QuizPage4Boxes.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignupPage from '@/pages/signup/SignupPage.vue';
import SignupSuccessPage from '@/pages/signup/SignupSuccessPage.vue';
import SignupBankPage from '@/pages/signup/SignupBankPage.vue';
import SignupBankInfoPage from '@/pages/signup/SignupBankInfoPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/signup/bank',
      name: 'signupBank',
      component: SignupBankPage
    },
    {
      path: '/signup/bank/info/:bankName/:bankImg',
      name: 'signupBankInfo',
      component: SignupBankInfoPage
    },
    {
      path: '/signup/success',
      name: 'signupSuccess',
      component: SignupSuccessPage
    },
    {
      path: '/quiz/counting',
      name: 'quizCounting',
      component: QuizCountingPage
    },
    {
      path: '/quiz1',
      name: 'quiz4Boxes',
      component: QuizPage4Boxes
    },
    {
      path: '/quiz2',
      name: 'quiz9Boxes',
      component: QuizPage9Boxes
    },
    {
      path: '/quiz3',
      name: 'quiz16Boxes',
      component: QuizPage16Boxes
    },
    {
      path: '/quiz/success',
      name: 'quizSuccess',
      component: QuizSuccessPage
    },
    {
      path: '/chatBot',
      name: 'chatBot',
      component: ChatBotPage
    }
  ]
});

export default router;
