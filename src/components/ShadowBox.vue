<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  height: {
    type: Number,
    required: false
  },
  paddingX: {
    type: Number,
    default: 20
  },
  paddingY: {
    type: Number,
    default: 20
  },
  marginBottom: {
    type: Number,
    default: 0
  }
});

const boxStyle = computed(() => ({
  height: props.height ? `${props.height}px` : '40',
  padding: `${props.paddingY}px ${props.paddingX}px`,
  marginBottom: `${props.marginBottom}px`
}));
</script>

<template>
  <div class="shadow-box transition-transform duration-200" :style="boxStyle">
    <slot></slot>
  </div>
</template>

<style scoped>
.shadow-box {
  position: relative;
  background-color: white;
  width: 100%;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}
</style>
