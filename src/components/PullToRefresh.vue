<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  threshold: {
    type: Number,
    default: 40
  }
});

const router = useRouter();
const pullDistance = ref(0);
const startY = ref(0);
const isRefreshing = ref(false);

const onTouchStart = (e: TouchEvent) => {
  if (!isRefreshing.value && document.documentElement.scrollTop === 0) {
    startY.value = e.touches[0].clientY;
  }
};

const onTouchMove = (e: TouchEvent) => {
  if (!isRefreshing.value && document.documentElement.scrollTop === 0) {
    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.value;
    if (delta > 0) {
      e.preventDefault();
      pullDistance.value = Math.min(delta / 2, props.threshold * 1.5);
    }
  }
};

const onTouchEnd = () => {
  if (pullDistance.value > props.threshold && !isRefreshing.value) {
    startRefresh();
  } else {
    pullDistance.value = 0;
  }
};

const startRefresh = () => {
  isRefreshing.value = true;
  setTimeout(() => {
    router.go(0);
    pullDistance.value = 0;
    isRefreshing.value = false;
  }, 1000);
};
</script>

<template>
  <div
    class="ptr-wrapper"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="ptr-content" :style="{ transform: `translateY(${pullDistance / 1.5}px)` }">
      <div class="ptr-indicator">
        <div class="ptr-spinner" :class="{ 'is-refreshing': isRefreshing }" />
      </div>
      <div class="ptr-slot-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ptr-wrapper {
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.ptr-content {
  min-height: 100%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.ptr-indicator {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.ptr-slot-wrapper {
  min-height: 100vh;
}

.ptr-spinner {
  width: 20px;
  height: 20px;
  border: 4px solid var(--white);
  border-top-color: var(--css-dark-yellow);
  border-right-color: var(--css-dark-yellow);
  border-radius: 50%;
  opacity: 0.8;
}

.is-refreshing {
  animation: ptr-rotate 0.8s linear infinite;
}

@keyframes ptr-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
