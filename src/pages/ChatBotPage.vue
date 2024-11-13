<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ChattingBox from '@/components/ChattingBox.vue';
import Main from '@/components/Main.vue';
import HeadBar from '@/components/HeadBar.vue';
import ChattingQuestionBox from '@/components/ChattingQuestionBox.vue';
import ChattingExplainBox from '@/components/ChattingExplainBox.vue';

const router = useRouter();

interface ChatResult {
  subject: string;
  name: string;
  benefit: string;
  question: string;
  explain: string;
}

const result = ref<ChatResult[]>([
  {
    subject: '신규고객 우대금리',
    name: '자유적금',
    benefit: '3.5% 금리혜택',
    question: '신규고객 우대금리 수민k 자유적금',
    explain:
      '신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금'
  },
  {
    subject: '고양이 고객 우대금리',
    name: '야옹적금',
    benefit: '반려묘 우대 0.5%',
    question: '신규고객 우대금리 수민k 자유적금',
    explain:
      '신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금2'
  },
  {
    subject: '블라고객 우대금리',
    name: '급여통장',
    benefit: '급여이체 시 4.0%',
    question: '신규고객 우대금리 수민k 자유적금3',
    explain:
      '신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금3'
  }
]);

const questionResult = ref<string>('');
const explainResult = ref<string>('');

const isQuestionVisible = ref(false);
const isExplainVisible = ref(false);

// 보험 상품 클릭 시, 순차적으로 질문과 설명을 보이게 하는 함수
const handleProductClick = (product: ChatResult) => {
  // 질문과 설명 초기화
  questionResult.value = product.question;
  explainResult.value = product.explain;

  // 순차적으로 표시될 수 있도록 타이머 설정
  isQuestionVisible.value = false;
  isExplainVisible.value = false;

  setTimeout(() => {
    isQuestionVisible.value = true; // 질문 표시
  }, 500); // 질문은 0.5초 후에 보이게

  setTimeout(() => {
    isExplainVisible.value = true; // 설명 표시
  }, 1500); // 설명은 1.5초 후에 보이게 (질문 뒤에 표시)
};

const fetchChatData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/recommand'); //백엔드 api 명세서 완료되면 주소 수정하면됨
    result.value = response.data;
  } catch (error) {
    console.error('Error fetching chat data:', error);
  }
};

onMounted(() => {
  // 백엔드 완성되면 쓰면 됩니다
  // fetchChatData();
});
</script>

<template>
  <HeadBar :back-button="true" :bg-gray="true"> 챗봇 </HeadBar>
  <Main :headbar="true" :padded="true" class="chat-gradation">
    <div class="h-[72px] flex justify-start items-center gap-[10px]">
      <div class="chatbot"><i class="fa-solid fa-comments"></i></div>
      <div class="w-[91px] h-[19px] font-semibold">보험 상품 추천</div>
    </div>
    <div class="pl-[20px] pr-[10px] flex flex-col gap-[10px]">
      <ChattingBox
        v-for="(item, index) in result"
        :key="index"
        :subject="item.subject"
        :name="item.name"
        :benefit="item.benefit"
        @click="handleProductClick(item)"
      />
    </div>
    <div v-if="isQuestionVisible" class="pl-[125px] pr-[10px] mt-[20px] flex-col gap-[10px]">
      <ChattingQuestionBox :question="questionResult" />
    </div>
    <div v-if="isExplainVisible" class="mt-[20px] pr-[10px] flex gap-[10px]">
      <div class="w-[48px] h-[40px] rounded-full bg-[#f59e0c] flex items-center"></div>
      <ChattingExplainBox :explain="explainResult" />
    </div>
  </Main>
</template>

<style scoped>
.chat-gradation {
  background: linear-gradient(to bottom, #fffbeb, #ffffff);
}

.chatbot {
  width: 40px;
  height: 40px;
  background-color: var(--css-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot i {
  font-size: 20px;
  color: var(--white);
}
</style>
