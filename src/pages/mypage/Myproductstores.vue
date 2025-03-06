<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../../stores/useProductStore";
import { useRoute } from "vue-router";

const store = useProductStore();
const route = useRoute();

onMounted(async () => {
  await store.fetchProducts(route.params.idx);
  console.log(store);
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
      v-for="(store, idx) in store.products"
      :key="`store-${idx}`"
      :store="store"
    >
      <router-link :to="`/product_detail/${store.id}`">
        <button
          class="w-full h-56 bg-cover rounded-md"
          :style="{ backgroundImage: `url(${store.imageUrl})` }"
        ></button>
      </router-link>

      <div class="px-5 py-3">
        <h3 class="text-gray-700 uppercase">{{ store.name }}</h3>
        <span class="text-gray-500 mt-2">{{ store.price }}원</span>
      </div>

      <!-- <div class="mt-1 p-2">
        <div class="mt-3 flex items-end justify-between">
          
          <p class="text-lg font-bold text-blue-500">{{ book.price }}원</p>

          <button
            v-if="book.wish"
            @click.prevent="onWishButton(book)"
            class="z-18 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <img id="starIcon" src="/src/assets/icon/white-star.svg" alt="찜" />
            <span class="text-sm truncate">찜하기</span>
          </button>

          <button
            v-if="!book.wish"
            @click.prevent="onWishButton(book)"
            class="z-18 flex items-center space-x-1 rounded-lg bg-blue-400 px-2 py-1.5 text-white border-solid duration-100 hover:bg-blue-500"
          >
            <img
              id="starIcon"
              src="/src/assets/icon/yellow-star-filled.svg"
              alt="찜"/>

            <span class="text-sm truncate">해제하기</span>
          </button>
        </div>
      </div> -->

    </div>
  </div>
</template>

<style scoped></style>