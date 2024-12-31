<script setup>
import { onMounted } from "vue";
import { useProductReview } from "../../stores/useProductReview";

const store = useProductReview();

onMounted(async() => {
  await store.fetchproductstore();
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
      class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
      v-for="(store, index) in store.stores"
      :key="`store-${index}`" :store="store"
    >
      <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <router-link :to="`/product_detail/${store.id}`">
          <button
            class="w-full h-56 bg-cover rounded-md"
            :style="{ backgroundImage: `url(${store.image_url})` }" >
          </button> 
        </router-link>

        
        <div class="px-5 py-3">
          <h3 class="text-gray-700 uppercase">{{ store.name }}</h3>
          <span class="text-gray-500 mt-2">{{ store.price }}원</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>