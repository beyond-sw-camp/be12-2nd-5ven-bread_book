<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import {useMemberStore} from "/src/stores/useMemberStore.js";
import ConfirmLogoutModal from "/src/pages/common/ConfirmLogoutModal.vue";
import { useMainBookStore } from "../../stores/useMainBookStore";
import { useRoute } from 'vue-router';

const route = useRoute();

const isMenuOpen = ref(true);
const memberStore = useMemberStore();
const store = useMainBookStore();

const isLogin = ref(false);
const isLogout = ref(true);
isLogin.value = false;
isLogout.value = !isLogin.value;

const isConfirmLogoutModalVisible = ref(false);

// 로그아웃 함수 작성...
function logout() {
  memberStore.logout();
  isLogin.value = memberStore.loginCheck();
  isLogout.value = !isLogin.value;
}

function showConfirmLogoutModal() {
  isConfirmLogoutModalVisible.value = true;
}

function hideConfirmLogoutModal() {
  isConfirmLogoutModalVisible.value = false;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value; // 상태 변경
  console.log("Menu toggled:", isMenuOpen.value); // 상태 확인
}

// 화면 크기 변경 감지 함수
function updateMenuStateBasedOnScreenWidth() {
  const isSmallScreen = window.innerWidth < 768; // 768px 미만
  isMenuOpen.value = !isSmallScreen;
}

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(async () => {
  updateMenuStateBasedOnScreenWidth(); // 초기 화면 크기에 따라 상태 설정
  window.addEventListener("resize", updateMenuStateBasedOnScreenWidth); // 화면 크기 변경 감지
  // await store.myImformation();

  isLogin.value = await memberStore.loginCheck();
  isLogout.value = !isLogin.value;
});

// 컴포넌트 언마운트 시 이벤트 리스너 해제
onUnmounted(() => {
  window.removeEventListener("resize", updateMenuStateBasedOnScreenWidth);
});




</script>


<template>
  <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <router-link to="/" class="flex items-center justify-center" style="min-width: 10.75rem;">
        <!-- <span class="self-center whitespace-nowrap text-xl font-semibold">📚책빵🍞</span> -->
        <img class="self-center" src="/src/assets/icon/logo-typo-with-books-apple.svg" alt="typo-logo">
      </router-link>
      <!--  Right side - Login & Signup buttons    -->
      <!--  오른쪽 - 로그인 버튼 & 외원가입 버튼    -->
      <div class="mt-2 sm:mt-0 sm:flex md:order-2 justify-center">
        <div class="flex flex-row justify-center md:min-w-[10.75rem]">
          <div v-if="isLogout">
            <router-link to="/login" type="button"
                         class="rounded mr-3 hidden border border-blue-700 py-1.5 px-2 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">
              <span>로그인</span>
            </router-link>
            <router-link to="/signup" type="button"
                         class="rounded mr-3 hidden border border-blue-700 bg-blue-700 py-1.5 px-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
              <span>회원가입</span>
            </router-link>
          </div>
          <div v-if="isLogin">
            <button type="button"
                    class="rounded mr-3 hidden border border-blue-700 py-1.5 px-2 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
                    @click="(function () {logout(); showConfirmLogoutModal();})()">로그아웃
            </button>
            <router-link to="/myproduct_home/myproductstores" type="button"
                         class="rounded mr-3 hidden border border-blue-700 bg-blue-700 py-1.5 px-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
              <span>마이페이지</span></router-link>
          </div>
        </div>
        <!--  Toggle Button for Narrow Window    -->
        <!--   좁은 창 전용 메뉴 토글 버튼    -->
        <button @click="toggleMenu" type="button"
                class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <!--  Middle - Links to pages
            Collapsible Menu -->
      <!--  가운데 - 페이지 이동 버튼들  -->
      <div v-if="isMenuOpen" class="z-20 w-full items-center justify-between md:order-1 md:flex md:w-auto">
        <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
          <li>
            <router-link
          to="/"
          class="block rounded py-2 pl-3 pr-4 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
          exact-active-class="text-blue-500 font-bold"
        >
          홈
        </router-link>
      </li>
      <li>
        <router-link
          :to="`/myproduct_home/myproductstores/${store.myIdx}`"
          class="block rounded py-2 pl-3 pr-4 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
          exact-active-class="text-blue-500 font-bold"
        >
          내상품
        </router-link>
      </li>
      <li>
        <router-link
          to="/productregister"
          class="block rounded py-2 pl-3 pr-4 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
          exact-active-class="text-blue-500 font-bold"
        >
          판매하기
        </router-link>
      </li>
      <li>
        <router-link
          to="/chat"
          class="block rounded py-2 pl-3 pr-4 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
          exact-active-class="text-blue-500 font-bold"
        >
          채팅하기
        </router-link>
          </li>
          <!--          <li class="md:hidden flex flex-row justify-end">-->
          <!--            <button-->
          <!--                class="mx-2 px-1 block rounded py-2 px-3 bg-blue-600 text-white hover:bg-blue-500 md:p-0 md:hover:bg-transparent">-->
          <!--              <router-link to="/login">-->
          <!--                로그인-->
          <!--              </router-link>-->
          <!--            </button>-->
          <!--            <button @click="(function () {logout(); showConfirmLogoutModal();})()"-->
          <!--                    class="mx-2 px-1 block rounded py-2 px-3 bg-blue-600 text-white hover:bg-blue-500 md:p-0 md:hover:bg-transparent">-->
          <!--              로그아웃-->
          <!--            </button>-->
          <!--          </li>-->

        </ul>
      </div>
    </div>
  </nav>
  <ConfirmLogoutModal :isVisible="isConfirmLogoutModalVisible" @close="hideConfirmLogoutModal()"></ConfirmLogoutModal>
</template>
