import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  // state
  const backgroundColor = ref('#f6f7f6');

  // action
  function setThemeColor(color: string) {
    backgroundColor.value = color;
    // CSS 변수 설정
    document.documentElement.style.setProperty('--background-color', color);
    // meta 태그 theme-color 업데이트
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  }

  return {
    backgroundColor,
    setThemeColor
  };
});
