<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  height: {
    type: Number,
    required: false
  },
  paddingX: {
    type: Number,
    default: 17
  },
  paddingY: {
    type: Number,
    default: 13
  },
  marginBottom: {
    type: Number,
    default: 0
  },
  question: {
    type: String,
    default: ''
  }
});

const boxStyle = computed(() => ({
  padding: `${props.paddingY}px ${props.paddingX}px`,
  marginBottom: `${props.marginBottom}px`
}));
</script>

<template>
  <div class="chatting-question-box transition-transform duration-200" :style="boxStyle">
    <div class="font-semibold text-xs text-white">{{ question }}</div>
  </div>
</template>

<style scoped>
.chatting-question-box {
  position: relative;
  background-color: #fbbf24;
  width: 100%;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
