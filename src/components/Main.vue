<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useThemeStore } from '@/stores/theme';
const props = defineProps({
  padded: {
    type: Boolean,
    default: false
  },
  bgGray: {
    type: Boolean,
    default: false
  }
});
const themeStore = useThemeStore();
themeStore.setThemeColor(`${props.bgGray ? '#F6F7F6' : '#FDFDFD'}`);
const bgColor = computed(() => (props.bgGray ? 'var(--background)' : 'var(--white)'));
</script>

<template>
  <div :class="padded ? 'padded main-frame ' : 'main-frame'" :style="{ backgroundColor: bgColor }">
    <slot></slot>
  </div>
</template>

<style scoped>
.main-frame {
  background-color: var(--background);
  position: absolute;
  width: 100%;
  height: calc(100% - 76px);
  overflow-x: hidden;
  overflow-y: scroll;
}
.padded {
  padding: 0px 5.56%;
}
</style>
