<script setup>
import {computed, onMounted, ref} from "vue";
import {useMainBookStore} from "/src/stores/useMainBookStore.js";
import { useRoute } from "vue-router";
import { useMemberStore } from "/src/stores/useMemberStore.js";
import needLoginModal from "/src/pages/common/needLoginModal.vue";
//import Float from "/src/pages/common/Float.vue";
//import WishList from "/src/pages/common/WishList.vue";
import { useLoadingStore } from "/src/stores/useLoadingStore";

const loadingStore = useLoadingStore();
const route = useRoute();
const memberStore = useMemberStore();

const isLogin = ref(false);
const isLogout = ref(true);
isLogin.value = memberStore.loginCheck();
isLogout.value = !isLogin.value;

const isNeedLoginModalVisible = ref(false);

const bookStore = useMainBookStore();
const books = ref([]);

const firstBook = computed(() => bookStore.books[route.params.id - 1]);
onMounted(async () => {
  loadingStore.startLoading();
  await bookStore.fetchBooks();
  books.value = bookStore.books.map((book) => ({
    ...book,
    wish: book.wish === "true" || book.wish === true, // 문자열 "false"를 Boolean으로 변환
    // API 응답에서 wish 초기값은 모두 false인데 초기값이 모두 true로 되어있음.
    // 그리하여 본 코드를 추가했으나, 그럼에도 적용 안 됨.
    // 그래서 v-if 조건을 반대로 설정해둠
  }));
  loadingStore.stopLoading();
});

function onWishButton(book) {
  if (isLogin.value) {
    book.wish = !book.wish;
    console.log(`${book.title}의 wish 상태가 ${book.wish ? "추가됨" : "제거됨"}`);
  } else if (isLogout) {
    isNeedLoginModalVisible.value = true;
  }
};

function hideNeedLoginModal() {
  isNeedLoginModalVisible.value = false;
};

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
          <h3 class="text-gray-700 uppercase text-lg">{{ firstBook.title }} {{ firstBook.author }}</h3>
          <span class="text-gray-500 mt-3 px-3"> {{ firstBook.price }}원 </span>
          <hr class="my-3">
          <div class="mt-2">
            <div class="text-gray-700 text-sm">책 상태</div>
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
            <button v-if="firstBook.wish" @click="onWishButton(firstBook)"
                    class="h-10 mx-2 text-gray-600 bg-indigo-600 border rounded-md p-2 hover:bg-indigo-500 focus:outline-none">
              <img src="/src/assets/icon/white-star.svg" alt="white-star">
            </button>
            <button v-if="!firstBook.wish" @click="onWishButton(firstBook)"
                    class="h-10 mx-2 text-gray-600 bg-indigo-600 border rounded-md p-2 hover:bg-indigo-500 focus:outline-none">
              <img src="/src/assets/icon/yellow-star-filled.svg" alt="yellow-star-filled">
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
                <button v-if="book.wish" @click.prevent="onWishButton(book)"
                        class="z-19 absolute bottom-2 right-5 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <img class="h-5 w-5" src="/src/assets/icon/white-star.svg" alt="white-star">
                </button>
                <button v-if="!book.wish" @click.prevent="onWishButton(book)"
                        class="z-19 absolute bottom-2 right-5 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <img class="h-5 w-5" src="/src/assets/icon/yellow-star-filled.svg" alt="white-star">
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
    <needLoginModal :isVisible="isNeedLoginModalVisible" @close="hideNeedLoginModal"></needLoginModal>
  </main>
</template>

<style scoped>

</style>