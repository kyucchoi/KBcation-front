import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizCountingPage from '@/pages/quiz/QuizCountingPage.vue';
import QuizSuccessPage from '@/pages/quiz/QuizSuccessPage.vue';
import ChatBotPage from '@/pages/ChatBotPage.vue';
import QuizPage9Boxes from '@/pages/quiz/QuizPage9Boxes.vue';
import QuizPage16Boxes from '@/pages/quiz/QuizPage16Boxes.vue';
import QuizPage4Boxes from '@/pages/quiz/QuizPage4Boxes.vue';

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
