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
  },
  headbar: {
    type: Boolean,
    default: false
  }
});

const themeStore = useThemeStore();
themeStore.setThemeColor(`${props.bgGray ? '#F6F7F6' : '#FDFDFD'}`);

const mainStyle = computed(() => ({
  backgroundColor: props.bgGray ? 'var(--background)' : 'var(--white)',
  marginTop: props.headbar ? '52px' : '0', // headbar가 true일 때 상단 여백 추가
  padding: props.padded ? '0 5.13%' : '0',
  height: props.headbar ? 'calc(100% - 52px)' : '100%' // headbar가 true일 때 높이 조정
}));
</script>

<template>
  <div :class="padded ? 'padded main-frame' : 'main-frame'" :style="mainStyle">
    <slot></slot>
  </div>
</template>

<style scoped>
.main-frame {
  background-color: var(--background);
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.padded {
  padding: 0px 5.13%;
}
</style>
