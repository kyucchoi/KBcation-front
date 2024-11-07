import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizCountingPage from '@/pages/quiz/QuizCountingPage.vue';
import QuizPage from '@/pages/quiz/QuizPage.vue';
import QuizSuccessPage from '@/pages/quiz/QuizSuccessPage.vue';
import ChatBotPage from '@/pages/ChatBotPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomePage
    },
    {
      path: '/quiz/counting',
      name: 'quizCounting',
      component: QuizCountingPage
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage
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
