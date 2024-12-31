<script setup>
// 임시로 useResultBookStore.js 데이터 가져다 씀
import {computed, onMounted} from "vue";
import {useMainBookStore} from "/src/stores/useMainBookStore.js";
import { useRoute } from "vue-router";
//import Float from "/src/pages/common/Float.vue";
//import WishList from "/src/pages/common/WishList.vue";

const bookStore = useMainBookStore();

const route = useRoute();
const firstBook = computed(() => bookStore.books[route.params.id-1]);
onMounted(() => {
  bookStore.fetchResult();
});

</script>

<template>
  <main class="pt-16 my-16">
    <div class="container mx-auto px-6">
      <div v-if="firstBook" class="md:flex md:items-center">
        <div class="w-full h-64 md:w-1/2 lg:h-96">
          <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
               :src="firstBook.imgSrc" :alt="firstBook.alt">
        </div>
        <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 class="text-gray-700 uppercase text-lg">{{ firstBook.title }} {{firstBook.author}}</h3>
          <span class="text-gray-500 mt-3 px-3"> {{ firstBook.price }}원 </span>
          <hr class="my-3">
          <div class="mt-2">
            <div class="text-gray-700 text-sm" >책 상태</div>
            <div class="flex items-center mt-1">
              <span>☀️</span>
              <span class="text-gray-700 text-lg">양호</span>
            </div>
          </div>
          <div class="mt-3">
            <label class="text-gray-700 text-sm" for="count">판매자 정보</label>
            <div class="flex items-center mt-1">
              <span class="h-5 w-5 rounded-full mr-2 focus:outline-none">🍞</span>
              <span class="h-5 rounded-full mr-2 focus:outline-none">식빵등급판매자</span>
            </div>
          </div>
          <div class="flex items-center mt-6">
            <router-link :to="`/chat/${route.params.id}`">
              <button 
                  class="h-10 px-8 py-2 bg-indigo-600 text-white text-md font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                채팅하기
              </button>
            </router-link>
            <button
                class="h-10 mx-2 text-gray-600 bg-indigo-600 border rounded-md p-2 hover:bg-yellow-500 focus:outline-none">
              <img src="/src/assets/icon/white-star.svg" alt="white-star">
            </button>
          </div>
        </div>
      </div>
      <div class="mt-16">
        <h3 class="text-gray-600 text-2xl font-medium">관련 상품 목록</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          <router-link :to="`/product_detail/${book.id}`"
                       v-for="book in bookStore.books"
                       :key="book.id">
            <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
              <div class="relative">
                <img class="w-full h-56 object-cover"
                     :src="book.imgSrc" :alt="book.alt">
                <button
                    class="absolute bottom-2 right-5 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <img class="h-5 w-5" src="/src/assets/icon/white-star.svg" alt="white-star">
                </button>
              </div>
              <div class="px-5 py-3">
                <h3 class="text-gray-700 uppercase">{{ book.title }} {{ book.author }}</h3>
                <span class="text-gray-500 mt-2">{{ book.price }}원</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>