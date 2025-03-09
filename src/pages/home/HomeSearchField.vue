<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";
const router = useRouter();
import {useProductReadStore} from "/src/stores/useProductReadStore.js";

const bookStore = useProductReadStore();

const searchInput = ref('');
const selectedFilter = ref('전체');

function onSearchClick() {
  const filterObj = {};
  switch (selectedFilter.value) {
    case '전체':
    default:
      filterObj.keyword = searchInput.value;
      break;
    case '제목':
      filterObj.title = searchInput.value;
      break;
    case '저자':
      filterObj.author = searchInput.value;
      break;
    case '출판사':
      filterObj.publisher = searchInput.value;
      break;
    case '키워드':
      filterObj.keyword = searchInput.value;
      break;
  }
  bookStore.updateFilters(filterObj);
  bookStore.fetchProducts(0, bookStore.pageSize);
  if (router.currentRoute.value.path !== '/result'){
    router.push({path: '/result'});
  }
}
</script>

<template>
  <article class="px-6 relative max-w-2xl mx-auto" style="margin-bottom: 1rem;">
    <div class="flex items-center space-x-2">
      <!-- 상단 버튼 -->
      <form action="/" class="flex flex-col items-start rounded-lg shadow-md max-w-md">
        <label for="book" class="text-sm font-medium text-gray-700"></label>
        <select v-model="selectedFilter" name="bookdetails" id="book"
                class="block w-24 h-10 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="전체">전체</option>
          <option value="제목">제목</option>
          <option value="저자">저자</option>
          <option value="출판사">출판사</option>
          <option value="키워드">키워드</option>
        </select>
      </form>
      <!-- 검색 바 -->
      <form class="flex flex-grow items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <input v-model="searchInput" type="text" id="simple-search"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search" required>
        </div>
<!--                        @click="(function(){router.push({ path: '/result'});}());"-->
        <button type="submit" @click="onSearchClick"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>
    </div>

  </article>
</template>

<style scoped>

</style>