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
    <div class=" flex-grow flex justify-center items-center">
      <div class="bg-white w-full max-w-[800px] h-[500px] p-6 rounded-lg shadow-md">
        <!-- 상단 타이틀 -->
        <div class="flex items-center mb-4">
          <h1 class="text-4xl font-bold mb-4">찜 목록</h1>
        </div>      

        <hr class="mb-2 border-0 border-t border-gray-300" />

        <!-- 예시 -->
        <div class="overflow-y-auto h-[350px]">

          <div div class="flex justify-between mt-4 mr-4 border border-gray-300 rounded-lg p-4 mb-4 flex items-start">
            <div class="flex mt-4">
              <img
                class="h-20 w-20 object-cover rounded"
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                alt=""
              />

              <div class="mx-3">
                <h3 class="text-sm text-gray-600">
                  Mac Book Pro
                </h3>
              </div>
            </div>

            <span class="text-gray-600">20$</span>
          </div>
          
          <div div class="flex justify-between mt-4 mr-4 border border-gray-300 rounded-lg p-4 mb-4 flex items-start">
            <div class="flex mt-4">
              <img
                class="h-20 w-20 object-cover rounded"
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                alt=""
              />

              <div class="mx-3">
                <h3 class="text-sm text-gray-600">
                  Mac Book Pro
                </h3>
              </div>
            </div>

            <span class="text-gray-600">20$</span>
          </div>

      </div>

        <!-- v-for문을 이용한 리스트 출력 -->
        <router-link
          v-for="(wish, idx) in wish.wishList"
          :key="`wish-${idx}`"
          :wish="wishList"
          class="review-item flex flex-col md:flex-row md:items-start mx-auto max-w-6xl mt-10"
          :to="`/paymentDetails/${1}`"
        >
          <div class="flex justify-between mt-2">
            <img class="w-[48px] h-[60px] object-contain rounded-md" src="#" />

            <div class="ml-[35px] font-semibold text-sm">
            {{ wishList.title }}
            </div>

            <span class="text-gray-600">20$</span>
          </div>

          <hr class="mb-2 border-0 border-t border-gray-300" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>