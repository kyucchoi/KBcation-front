<template>
  <div class="navbar-frame">
    <div class="tab-frame" v-for="(tab, index) in navTabs" :key="index">
      <router-link :to="tab.path">
        <div :class="$route.path === tab.path ? 'tab tab-active' : 'tab'">
          <i :class="tab.icon"></i>
          <span>{{ tab.name }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface NavTab {
  path: string;
  name: string;
  icon: string;
}

const navTabs: Ref<NavTab[]> = ref([
  {
    path: '/',
    name: '홈',
    icon: 'fa-solid fa-house'
  },
  {
    path: '/chatbot',
    name: '챗봇',
    icon: 'fa-solid'
  }
]);
</script>

<style scoped>
.navbar-frame {
  position: absolute;
  padding: 0 4%;
  bottom: 0;
  width: 100%;
  height: 76px;
  display: flex;
  border-top: 1px solid var(--gray);
  background-color: var(--white);
  z-index: 2;
}

.tab-frame {
  position: relative;
  width: calc(100% / 2);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--nav-gray);
}

.tab span {
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 12px;
}

.tab-active {
  color: var(--black);
}

a {
  text-decoration: none;
}
</style>
