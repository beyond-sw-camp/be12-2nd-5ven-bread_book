<!-- 백엔드 연동을 위하여 BookList에서 수정된 새로운 파일 -->
<!-- [Test in progress] 백엔드 연동을 위해 임시 교체 시도중 -->
<script setup>
import {onMounted, ref} from 'vue'; // 컴포넌트가 마운트되었을 때 response data를 갖고 오기 위해서 추가
//import {useMainBookStore} from '/src/stores/useMainBookStore.js'; // 책 관련 데이터 상태를 관리하는 store 가져오기
import {useProductReadStore} from "../../stores/useProductReadStore.js";
import {useRoute} from "vue-router";
import needLoginModal from "/src/pages/common/needLoginModal.vue";
import {useMemberStore} from "/src/stores/useMemberStore.js";
import {useLoadingStore} from "/src/stores/useLoadingStore";


const loadingStore = useLoadingStore();
const route = useRoute();
const memberStore = useMemberStore();

const isLogin = ref(false);
const isLogout = ref(true);
isLogin.value = false;
isLogout.value = !isLogin.value;
const isNeedLoginModalVisible = ref(false);

const isWideSection = ref(false);
//const bookStore = useMainBookStore();
const bookStore = useProductReadStore();
const books = ref([]);
onMounted(async () => {
  loadingStore.startLoading();
  if (route.name === 'Home') {
    isWideSection.value = true;
    await bookStore.fetchProducts();
  }
  else if (route.name === 'SearchResult') {
    isWideSection.value = false;
    await bookStore.fetchProducts();
  }
  // if (route.name === 'Home') {
  //   isWideSection.value = true;
  //   await bookStore.fetchProducts();
  //   books.value = bookStore.books.map((book) => ({
  //     ...book,
  //     wish: book.wish === 'true' || book.wish === true, // 문자열 "false"를 Boolean으로 변환
  //   }));
  // }
  // else if (route.name === 'SearchResult') {
  //   isWideSection.value = false;
  //   await bookStore.fetchResult();
  //   books.value = bookStore.books.map((book) => ({
  //     ...book,
  //     wish: book.wish === 'true' || book.wish === true, // 문자열 "false"를 Boolean으로 변환
  //   }));
  // }
  isLogin.value = memberStore.isLogin;
  isLogout.value = !isLogin.value;
  loadingStore.stopLoading();
});


function onWishCanceledButton(book) {
  if (isLogin.value) {
    book.wishCanceled = !book.wishCanceled;
    console.log(`${book.title}의 wishCanceled 상태가 ${book.wishCanceled ? "추가됨" : "제거됨"}`);
  } else if (isLogout) {
    isNeedLoginModalVisible.value = true;
  }
};

function hideNeedLoginModal() {
  isNeedLoginModalVisible.value = false;
};
</script>

<template>
  <section class="bg-gray-100">
    <div class="mx-auto grid grid-cols-1 gap-6 p-6 sm:grid-cols-21"
         :class="{ 'max-w-7xl md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5': isWideSection, 'max-w-6xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': !isWideSection }">
      <!-- v-for 동적으로 렌더링 -->
      <article v-for="book in bookStore.books" :key="book.id"
               class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
        <router-link :to="`/product_detail/${book.productIdx}`">
          <div class="flex flex-col justify-between h-full">
            <div>
              <div class="inline-block mb-1 font-bold text-md rounded-lg bg-blue-100 border-blue-500 px-2 py-1.5 text-blue-500 space-x-1.5">{{ book.bookCondition }}</div>
              <div
                  class="relative flex items-end overflow-hidden rounded-xl"
                  style="max-height: 22rem; min-height: 22rem;">
                <img :src="book.firstImageUrl" :alt="book.title"
                     style="width: 100%; height: 22rem; object-fit: cover;"/>
              </div>
              <h2 class="mt-2 text-slate-700 truncate">{{ book.author }} {{ book.title }}</h2>
              <p class="mt-1 text-sm text-slate-400 truncate">
                {{ book.publisher }}, {{ book.publicationDate }}
              </p>
            </div>
            <div class="mt-1 p-2">
              <div class="mt-3 flex items-end justify-between">
                <p class="text-lg font-bold text-blue-500">{{ book.price }}원</p>
                <button v-if="book.wishCanceled" @click.prevent="onWishCanceledButton(book)"
                        class="z-18 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600">
                  <img id="starIcon" src="/src/assets/icon/white-star.svg" alt="찜"/>
                  <span class="text-sm truncate">찜하기</span>
                </button>
                <button v-if="!book.wishCanceled" @click.prevent="onWishCanceledButton(book)"
                        class="z-18 flex items-center space-x-1 rounded-lg bg-blue-400 px-2 py-1.5 text-white border-solid duration-100 hover:bg-blue-500">
                  <img id="starIcon" src="/src/assets/icon/yellow-star-filled.svg" alt="찜"/>
                  <span class="text-sm truncate">해제하기</span>
                </button>
              </div>
            </div>
          </div>
        </router-link>

      </article>
    </div>
  </section>
  <needLoginModal :isVisible="isNeedLoginModalVisible" @close="hideNeedLoginModal"></needLoginModal>
</template>
