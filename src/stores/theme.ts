import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const backgroundColor = ref('#f6f7f6');

  function setThemeColor(color: string) {
    backgroundColor.value = color;
    document.documentElement.style.setProperty('--background-color', color);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  }

  return {
    backgroundColor,
    setThemeColor
  };
});
