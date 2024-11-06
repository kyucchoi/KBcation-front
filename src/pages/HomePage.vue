<script setup lang="ts">
import ShadowBox from '@/components/ShadowBox.vue';
import Main from '@/components/Main.vue';
</script>

<template>
  <Main :padded="true" :bg-gray="true">
    <div class="test">
      <ShadowBox>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
        <div>김시완!</div>
      </ShadowBox>
    </div>
    <ShadowBox>
      <div>안녕</div>
    </ShadowBox>
    <div>김시완</div>
    <div>김시완</div>
  </Main>
</template>

<style scoped>
.test {
  margin-top: 20px;
}
</style>
