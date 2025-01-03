<script setup>

import { onMounted } from 'vue'; // 컴포넌트가 마운트되었을 때 response data를 갖고 오기 위해서 추가
import { useMainBookStore } from '/src/stores/useMainBookStore.js'// 책 관련 데이터 상태를 관리하는 store 가져오기

import HomeSearchField from "./HomeSearchField.vue";
import SearchResultAside from "./SearchResultAside.vue";
import HomeBookList from "./HomeBookList.vue";
import { useLoadingStore } from "/src/stores/useLoadingStore";

const loadingStore = useLoadingStore();

const bookStore = useMainBookStore();

// onMounted 메서드로 컴포넌트가 마운트되었을 때 책 데이터를 가져오도록 함
onMounted(() => {
  loadingStore.startLoading();
  bookStore.fetchResult();
  loadingStore.stopLoading();
});
</script>

<template>
<main class="mt-16">
  <SearchResultAside></SearchResultAside>
  <section class="flex-1" style="margin-left:16rem">
    <!-- Title h2 -->
    <div class="pt-12  bg-white flex flex-col items-center text-center" style="margin-bottom: 3rem;">
      <!-- * 수정 필요 - 데이터에 따라 바뀌어야 하는 부분 -->
      <h2 class="text-center text-2xl text-gray-800 font-bold">'<span style="color: #1D4ED8;">한강</span>'에 대한 <span
          style="color: #1D4ED8;">{{ bookStore.books.length }}</span>개의 검색결과</h2>
    </div>
    <HomeSearchField></HomeSearchField>
    <HomeBookList></HomeBookList>
  </section>

</main>
</template>

<style scoped>

</style>