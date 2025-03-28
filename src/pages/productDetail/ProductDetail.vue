<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainBookStore } from "/src/stores/useMainBookStore.js";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "/src/stores/useMemberStore.js";
import needLoginModal from "/src/pages/common/needLoginModal.vue";
//import Float from "/src/pages/common/Float.vue";
//import WishList from "/src/pages/common/WishList.vue";
import { useLoadingStore } from "/src/stores/useLoadingStore";
import ChatConfirmModal from "../chat/ChatConfirmModal.vue";
import { useProductStore } from "/src/stores/useProductStore.js"

const loadingStore = useLoadingStore();
const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();
const productStore = useProductStore();

const isLogin = ref(false);
const isLogout = ref(true);
isLogin.value = memberStore.loginCheck();
isLogout.value = !isLogin.value;

const isNeedLoginModalVisible = ref(false);
const isChatConfirmModalVisible = ref(false);

const bookStore = useMainBookStore();
const books = ref([]);

const productIdx = computed(() => {
  if (!productStore.products?.content) {
    console.error("productStore.products.content가 없음!", productStore.products);
    return undefined;
  }

  const product = productStore.products.content.find(p => p.productIdx == Number(route.params.id));
  console.log("찾은 상품:", product);
  return product ? product.productIdx : undefined;
});




const firstBook = computed(() => bookStore.books[route.params.id - 1]);
onMounted(async () => {
  loadingStore.startLoading();
  await productStore.fetchProducts();
  console.log("백엔드에서 받아온 상품 목록:", productStore.products);
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

function onChatButton() {
  if (isLogin.value) {
    isChatConfirmModalVisible.value = true; // 모달 표시
  } else {
    isNeedLoginModalVisible.value = true;
  }
}

// 백엔드 API에 채팅방 생성 요청 후 채팅방으로 이동
async function confirmChat() {
  const buyerIdx = memberStore.member?.idx; // 로그인한 유저 ID
  console.log(" 현재 로그인한 유저 (buyerIdx):", buyerIdx);
  console.log(" 보낼 productIdx:", productIdx.value);
  console.log(" 보낼 buyerIdx:", buyerIdx);

  if (!buyerIdx) {
    alert(" 로그인 정보가 없습니다. 다시 로그인해 주세요.");
    return;
  }

  if (!productIdx.value) {
    alert(" 상품 정보를 찾을 수 없습니다.");
    return;
  }

  const requestData = {
    productIdx: productIdx.value,
    buyerIdx: buyerIdx,
  };

  console.log(" 보낼 JSON 데이터:", JSON.stringify(requestData));

  try {
    const response = await fetch("/api/chatting/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    console.log(" 채팅방 생성 응답:", data);

    if (!response.ok) {
      console.error(` 서버 오류 발생! HTTP 상태 코드: ${response.status}`);
      alert(`채팅방 생성 실패: 서버 오류 (${response.status})`);
      return;
    }

    if (data.code !== 6000) {
      console.error(" 채팅방 생성 응답이 올바르지 않음:", data);
      alert(`채팅방을 생성할 수 없습니다: ${data.message || "알 수 없는 오류"}`);
      return;
    }

    //  채팅방으로 이동
    router.push(`/chat/${data.identifier}`);
  } catch (error) {
    console.error(" 채팅방 요청 오류:", error);
    alert("서버 오류로 인해 채팅방을 생성할 수 없습니다.");
  } finally {
    isChatConfirmModalVisible.value = false;
  }
}




// 모달 닫기 함수
function hideChatConfirmModal() {
  isChatConfirmModalVisible.value = false;
}

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
          <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto" :src="firstBook.imgSrc"
            :alt="firstBook.alt">
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

          <div class="flex flex-col items-start mt-6">
            <div class="flex items-center mb-4">
              <!-- <router-link :to="`/chat/${route.params.id}`"> -->
              <button @click="onChatButton"
                class="h-10 px-8 py-2 bg-indigo-600 text-white text-md font-medium rounded hover:bg-indigo-500">
                채팅하기
              </button>
              <!-- </router-link> -->

              <button v-if="firstBook.wish" @click="onWishButton(firstBook)"
                class="h-10 mx-2 text-gray-600 bg-indigo-600 border rounded-md p-2 hover:bg-indigo-500 focus:outline-none">
                <img src="/src/assets/icon/white-star.svg" alt="white-star">
              </button>

              <button v-if="!firstBook.wish" @click="onWishButton(firstBook)"
                class="h-10 mx-2 text-gray-600 bg-indigo-600 border rounded-md p-2 hover:bg-indigo-500 focus:outline-none">
                <img src="/src/assets/icon/yellow-star-filled.svg" alt="yellow-star-filled">
              </button>
            </div>

            <router-link to="/report">
              <button
                class="h-10 px-8 py-2 bg-600 text-red text-md font-medium rounded hover:bg-white-500 focus:bg-red-500">
                신고하기
              </button>
            </router-link>
          </div>

        </div>
      </div>
      <div class="mt-16">
        <h3 class="text-gray-600 text-2xl font-medium">관련 상품 목록</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          <router-link :to="`/product_detail/${book.id}`" v-for="book in bookStore.books" :key="book.id">
            <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
              <div class="relative">
                <img class="w-full h-56 object-cover" :src="book.imgSrc" :alt="book.alt">
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
    <!-- 채팅 확인 모달 -->
    <ChatConfirmModal :isVisible="isChatConfirmModalVisible" @confirm="confirmChat" @close="hideChatConfirmModal" />

    <needLoginModal :isVisible="isNeedLoginModalVisible" @close="hideNeedLoginModal"></needLoginModal>
  </main>
</template>

<style scoped></style>
