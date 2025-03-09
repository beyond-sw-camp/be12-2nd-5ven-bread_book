<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue'; // 컴포넌트가 마운트되었을 때 response data를 갖고 오기 위해서 추가
//import {useMainBookStore} from '/src/stores/useMainBookStore.js'// 책 관련 데이터 상태를 관리하는 store 가져오기
import {useProductReadStore} from "../../stores/useProductReadStore.js";
import HomeSearchField from "/src/pages/home/HomeSearchField.vue";
import SearchResultAside from "/src/pages/home/SearchResultAside.vue";
// [Test in progress] 백엔드 연동을 위해 임시 교체 시도중
// import BookList from "/src/pages/common/BookList.vue";
import BookList from "/src/pages/common/ProductList.vue";

import {useLoadingStore} from "/src/stores/useLoadingStore";

const loadingStore = useLoadingStore();
const bookStore = useProductReadStore();


const isAsideOpen = ref(true);

function toggleAside() {
  isAsideOpen.value = !isAsideOpen.value;
}

const currentSearchLabel = computed(() => {
  const filters = bookStore.filters;
  if (filters.title) return `${filters.title}`;
  else if (filters.author) return `${filters.author}`;
  else if (filters.publisher) return `${filters.publisher}`;
  else return `${filters.keyword}`;
});

function updateMenuStateBasedOnScreenWidth() {
  const isSmallScreen = window.innerWidth < 1024; // 1024px 미만
  isAsideOpen.value = !isSmallScreen;
}

// onMounted 메서드로 컴포넌트가 마운트되었을 때 책 데이터를 가져오도록 함
onMounted(() => {
  updateMenuStateBasedOnScreenWidth();
  window.addEventListener("resize", updateMenuStateBasedOnScreenWidth);
  loadingStore.startLoading();
  // bookStore.fetchProducts();
  loadingStore.stopLoading();
});
onUnmounted(() => {
  window.removeEventListener("resize", updateMenuStateBasedOnScreenWidth);
});

</script>

<template>
  <main class="flex" style="margin-top: 4.5rem; height: 100%;">
    <SearchResultAside v-if="isAsideOpen"></SearchResultAside>
    <button
        class="inline-block lg:hidden z-20 fixed text-center rounded-md border border-gray-300 bg-white shadow-sm"
        :class="{ 'left-40' :isAsideOpen, 'left-4' :!isAsideOpen }"
        style="top: 5.5rem;"
        @click="toggleAside">
      <img src="/src/assets/icon/toggle.svg" alt="">
    </button>
    <section class="flex-1">
      <!-- Title h2 -->
      <div class="pt-12 bg-white flex flex-col items-center text-center" style="margin-bottom: 3rem;">
        <!-- * 수정 필요 - 데이터에 따라 바뀌어야 하는 부분 -->
        <h2 v-if="currentSearchLabel" class="text-center text-2xl text-gray-800 font-bold">'<span style="color: #1D4ED8;">{{currentSearchLabel}}</span>'에 대한 <span
            style="color: #1D4ED8;">{{ bookStore.books.length }}</span>개의 검색결과</h2>
      </div>
      <HomeSearchField></HomeSearchField>
      <BookList></BookList>
    </section>
  </main>
</template>

<style scoped>

</style>