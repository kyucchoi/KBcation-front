<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ChattingBox from '@/components/ChattingBox.vue';
import Main from '@/components/Main.vue';
import ChattingQuestionBox from '@/components/ChattingQuestionBox.vue';
import ChattingExplainBox from '@/components/ChattingExplainBox.vue';

const router = useRouter();

interface ChatResult {
  subject: string;
  name: string;
  benefit: string;
}

interface ChatQuestionResult {
  question: string;
}

interface ChatExplainResult {
  explain: string;
}

const result = ref<ChatResult[]>([
  { subject: '신규고객 우대금리', name: '자유적금', benefit: '3.5% 금리혜택' },
  { subject: '고양이 고객 우대금리', name: '야옹적금', benefit: '반려묘 우대 0.5%' },
  { subject: '블라고객 우대금리', name: '급여통장', benefit: '급여이체 시 4.0%' }
]);
// 현재 더미데이터 넣은거고 백엔드 데이터 완성되면 수정할 예정

const questionresult = ref<ChatQuestionResult[]>([
  { question: '신규고객 우대금리 수민k 자유적금' }
]);

const explainresult = ref<ChatExplainResult[]>([
  {
    explain:
      '신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금,신규고객 우대금리 수민k 자유적금'
  }
]);

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

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="w-100 h-[42px] mt-11 flex justify-start items-center px-5 gap-2 bg-white">
    <div class="">
      <img src="../assets/back.svg" alt="뒤로가기" @click="goBack" />
    </div>
    <div class="text-[#000000] text-[20px] font-semibold">챗봇</div>
  </div>
  <Main :padded="true" class="chat-gradation">
    <div class="h-[72px] flex justify-start items-center gap-[10px]">
      <div class="w-[40px] h-[40px] rounded-full bg-[#f59e0c] flex items-center"></div>
      <div class="w-[91px] h-[19px] font-semibold">보험 상품 추천</div>
    </div>
    <div class="pl-[20px] pr-[10px] flex flex-col gap-[10px]">
      <ChattingBox
        v-for="(item, index) in result"
        :key="index"
        :subject="item.subject"
        :name="item.name"
        :benefit="item.benefit"
      />
      <div class="pl-[125px] flex-col gap-[10px]">
        <ChattingQuestionBox
          v-for="(item, index) in questionresult"
          :key="index"
          :question="item.question"
        />
      </div>
    </div>
    <div class="mt-[20px] pr-[10px] flex gap-[10px]">
      <div class="w-[48px] h-[40px] rounded-full bg-[#f59e0c] flex items-center"></div>
      <ChattingExplainBox
        v-for="(item, index) in explainresult"
        :key="index"
        :explain="item.explain"
      />
    </div>
  </Main>
</template>

<style scoped>
.chat-gradation {
  background: linear-gradient(to bottom, #fffbeb, #ffffff);
}
</style>
