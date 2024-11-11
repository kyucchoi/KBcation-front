<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  height: {
    type: Number,
    required: false
  },
  paddingX: {
    type: Number,
    default: 16
  },
  paddingY: {
    type: Number,
    default: 12
  },
  marginBottom: {
    type: Number,
    default: 0
  },
  subject: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  benefit: {
    type: String,
    default: ''
  }
});

const boxStyle = computed(() => ({
  height: props.height ? `${props.height}px` : '76px',
  padding: `${props.paddingY}px ${props.paddingX}px`,
  marginBottom: `${props.marginBottom}px`
}));
</script>

<template>
  <div class="chatting-box transition-transform duration-200" :style="boxStyle">
    <div class="font-semibold text-xs">{{ subject }}</div>
    <div class="text-[#F59E0C] text-xs">{{ name }}</div>
    <div class="text-[#6A6E77] text-[10px]">{{ benefit }}</div>
  </div>
</template>

<style scoped>
.chatting-box {
  position: relative;
  background-color: var(--white);
  width: 100%;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid #cdcdcd;
}
</style>
