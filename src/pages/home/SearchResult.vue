<script setup>

import { onMounted } from 'vue'; // 컴포넌트가 마운트되었을 때 response data를 갖고 오기 위해서 추가
import { useResultBookStore } from '/src/stores/useResultBookStore.js'// 책 관련 데이터 상태를 관리하는 store 가져오기

import HomeSearchField from "./HomeSearchField.vue";
import SearchResultAside from "./SearchResultAside.vue";


/*
import { useMainBookStore } from '/src/stores/useMainBookStore.js'; // 책 관련 데이터 상태를 관리하는 store 가져오기
import HomeBookList from "./HomeBookList.vue";
const bookStore = useMainBookStore();
const router = useRouter();
 */

const bookStore = useResultBookStore();

// onMounted 메서드로 컴포넌트가 마운트되었을 때 책 데이터를 가져오도록 함
onMounted(() => {
  bookStore.fetchResult();
});
</script>

<template>
<main class="pt-16">
  <SearchResultAside></SearchResultAside>
  <section class="flex-1" style="margin-left:16rem">
    <!-- Title h2 -->
    <div class="pt-12  bg-white flex flex-col items-center text-center" style="margin-bottom: 3rem;">
      <!-- * 수정 필요 - 데이터에 따라 바뀌어야 하는 부분 -->
      <h2 class="text-center text-2xl text-gray-800 font-bold">'<span style="color: #1D4ED8;">한강</span>'에 대한 <span
          style="color: #1D4ED8;">{{ bookStore.books.length }}</span>개의 검색결과</h2>
    </div>
    <HomeSearchField></HomeSearchField>
    <section class="py-5 bg-gray-100">
      <div
          id="book-list"
          class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <!-- v-for 동적으로 렌더링 -->
        <article
            v-for="book in bookStore.books"
            :key="book.id"
            class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <div
                  class="relative flex items-end overflow-hidden rounded-xl"
                  style="max-width: 18rem; max-height: 22rem; min-height: 22rem;">
                <!-- @click="" 클릭 이벤트로 링크 추가하기 -->

                <img
                    :src="book.imgSrc"
                    :alt="book.alt"
                    style="width: 100%; height: 22rem; object-fit: cover;"
                />
              </div>
              <h2 class="mt-2 text-slate-700 truncate">{{ book.author }} {{ book.title }}</h2>
              <p class="mt-1 text-sm text-slate-400 truncate">
                {{ book.publisher }}, {{ book.publication_date }}
              </p>
            </div>
            <div class="mt-1 p-2">
              <div class="mt-3 flex items-end justify-between">
                <p class="text-lg font-bold text-blue-500">{{ book.price }}원</p>
                <button
                    id="wishBtn"
                    class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                >
                  <img id="starIcon" src="/src/assets/icon/white-star.svg" alt="찜" />
                  <span class="text-sm">찜하기</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>

</main>
</template>

<style scoped>

</style>