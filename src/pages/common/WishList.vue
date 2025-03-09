<script setup>
import { useRoute } from "vue-router";
import { useLoadingStore } from "../../stores/useLoadingStore";

import { onMounted } from "vue";
import { useWishListStore } from "../../stores/useWishListStore";

const route = useRoute();
const loadingStore = useLoadingStore();
const wish = useWishListStore();

onMounted(async () => {
  await wish.wishList();
});
</script> 

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="flex-grow flex justify-center items-center">
      <div
        class="bg-white w-full max-w-[800px] h-[550px] p-6 rounded-lg shadow-md"
      >
        <!-- 상단 타이틀 -->
        <div class="flex items-center mb-4">
          <h1 class="text-4xl font-bold mb-4">찜 목록</h1>
        </div>

        <hr class="mb-2 border-0 border-t border-gray-300" />

        <!-- 예시 -->
        <div 
          class="overflow-y-auto h-[400px] "
          v-for="(wish, idx) in wish.wishList"
          :key="`wish-${idx}`"
          :wish="wishList">

          <div class="flex items-center border border-gray-400 rounded-lg mb-4 p-4" >
            <router-link :to="`/paymentDetails/${1}`">
              <img
                class="w-20 h-20 object-cover rounded-md"
                src="#"/>
            </router-link>

            <!-- 수직선 -->
            <div class="h-full w-[2px] bg-gray-300 mx-4"></div>

  
            <div class="flex-grow">
              <h1 class="text-lg font-bold text-gray-800">
                {{ wishList.title }}
              </h1>
              <span class="text-gray-600">
                {{ wishList.price }}
              </span>
            </div>
  

            <button
              class="text-sm text-gray-500 hover:text-red-500 ml-auto"
            >
              삭제
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>