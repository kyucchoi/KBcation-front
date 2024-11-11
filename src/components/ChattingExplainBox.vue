<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  height: {
    type: Number,
    required: false
  },
  paddingTop: {
    type: Number,
    default: 12
  },
  paddingRight: {
    type: Number,
    default: 17
  },
  paddingBottom: {
    type: Number,
    default: 17
  },
  paddingLeft: {
    type: Number,
    default: 12
  },
  marginBottom: {
    type: Number,
    default: 0
  },
  explain: {
    type: String,
    default: ''
  }
});

const boxStyle = computed(() => ({
  height: props.height ? `${props.height}px` : '110px',
  padding: `${props.paddingTop}px ${props.paddingRight}px ${props.paddingBottom}px ${props.paddingLeft}px`,
  marginBottom: `${props.marginBottom}px`
}));
</script>

<template>
  <div class="chatting-explain-box transition-transform duration-200" :style="boxStyle">
    <div class="font-semibold text-xs">{{ explain }}</div>
  </div>
</template>

<style scoped>
.chatting-explain-box {
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
