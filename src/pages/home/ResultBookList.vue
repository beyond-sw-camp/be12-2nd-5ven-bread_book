<script setup>
import { useResultBookStore } from '/src/stores/useResultBookStore.js'
import {onMounted} from "vue";
const bookStore = useResultBookStore();
// onMounted 메서드로 컴포넌트가 마운트되었을 때 책 데이터를 가져오도록 함
onMounted(() => {
  bookStore.fetchResult();
});
</script>

<template>
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
        <router-link :to="`/product_detail/${book.id}`">
          <div class="flex flex-col justify-between h-full">
            <div>
              <div
                  class="relative flex items-end overflow-hidden rounded-xl"
                  style="max-width: 18rem; max-height: 22rem; min-height: 22rem;">
                <img :src="book.imgSrc" :alt="book.alt"
                     style="width: 100%; height: 22rem; object-fit: cover;"/>
              </div>
              <h2 class="mt-2 text-slate-700 truncate">{{ book.author }} {{ book.title }}</h2>
              <p class="mt-1 text-sm text-slate-400 truncate">
                {{ book.publisher }}, {{ book.publication_date }}
              </p>
            </div>
            <div class="mt-1 p-2">
              <div class="mt-3 flex items-end justify-between">
                <p class="text-lg font-bold text-blue-500 truncate">{{ book.price }}원</p>
                <button
                    id="wishBtn"
                    class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                >
                  <img id="starIcon" src="/src/assets/icon/white-star.svg" alt="찜" />
                  <span class="text-sm truncate">찜하기</span>
                </button>
              </div>
            </div>
          </div>
        </router-link>

      </article>
    </div>
  </section>
</template>

<style scoped>

</style>