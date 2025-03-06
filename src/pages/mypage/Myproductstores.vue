<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../../stores/useProductStore";
import { useRoute } from "vue-router";

const store = useProductStore();
const route = useRoute();

const sortedProdcut = computed(() => {
  return store.products.slice().sort((a , b) => b.idx - a.idx);
});

onMounted(async() => {
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
  <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div 
        class="p-3 w-full max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl hover:transform hover:scale-105 duration-300"
        v-for="(store, idx) in sortedProdcut"
        :key="`store-${idx}`" :store="store"
      >
        <router-link :to="`/product_detail/${store.id}`">
          <button
            class="w-full h-56 bg-cover rounded-md"
            :style="{ backgroundImage: `url(${store.imageUrl})` }" >
          </button> 
        </router-link>

        
        <div class="px-5 py-3">
          <h3 class="text-gray-700 uppercase">{{ store.name }}</h3>
          <span class="text-gray-500 mt-2">{{ store.price }}원</span>
        </div>
      </div>
  </div>
</template>

<style scoped></style>