  <script setup>
import { computed, onMounted } from "vue";
import { useProductStore } from "../../stores/useProductStore";
import { useRoute } from "vue-router";

const store = useProductStore();
const route = useRoute();
const idx = route.params.idx;

const sortStore = computed(() => {
  return store.products.slice().sort((a, b) => b.idx - a.idx);
});

const currentuserId = idx;

onMounted(async () => {
  await store.fetchProducts(idx);
});
</script>

  <script>
export default {
  name: "Myproductstores",
};
</script>

<template>
  <div
    class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <div
      class="p-3 w-full max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl hover:transform hover:scale-105 duration-300"
      v-for="(store, idx) in sortStore"
      :key="`store-${idx}`"
      :store="store"
    >
      <router-link :to="`/product_detail/${store.idx}`">
        <button
          class="w-full h-56 bg-cover rounded-md"
          :style="{ backgroundImage: `url(${ store.firstImageUrl })` }"
        ></button>
      </router-link>

      <template v-if="store.user_idx === currentUserId">
        <div class="px-5 py-3">
          <h3 class="text-gray-700 uppercase">
            {{ store.title }}
          </h3>

          <span class="text-gray-500 mt-2"> {{ store.price }}원 </span>
        </div>

        <div class="mt-1 p-2 flex items-end justify-between">
          <button
            class="z-18 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-3 py-2 text-white border-solid duration-100 hover:bg-blue-500"
          >
            <span class="text-sm truncate"> 수정 하기 </span>
          </button>

          <button
            class="ml-1 z-18 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-3 py-2 text-white duration-100 hover:bg-blue-600"
          >
            <span class="text-sm truncate"> 삭제 하기 </span>
          </button>
        </div>
      </template>

      <template v-else>
        <div class="px-5 py-3">
          <h3 class="text-gray-700 uppercase">
            {{ store.name }}
          </h3>
        </div>

        <div class="flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">
            {{ store.price }}원
          </p>

          <button
            v-if="book.wish"
            @click.prevent="onWishButton(book)"
            class="z-18 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <img id="starIcon" src="/src/assets/icon/white-star.svg" alt="찜" />

            <span class="text-sm truncate"> 찜하기 </span>
          </button>

          <button
            v-if="!book.wish"
            @click.prevent="onWishButton(book)"
            class="z-18 flex items-center space-x-1 rounded-lg bg-blue-400 px-2 py-1.5 text-white border-solid duration-100 hover:bg-blue-500"
          >
            <img
              id="starIcon"
              src="/src/assets/icon/yellow-star-filled.svg"
              alt="찜"
            />

            <span class="text-sm truncate"> 해제하기 </span>
          </button>
        </div>
      </template>
      
    </div>
  </div>
</template>

  <style scoped></style>