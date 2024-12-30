<script setup>
import { onMounted } from "vue";
import { useProductReview } from "../../stores/useProductReview";

const product = useProductReview();

onMounted(() => {
  product.fetchproductreview();
});
</script>

<script>
export default {
  name: "Myproductstores",
};
</script>


<template>
  <div
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
    v-for="(review, index) in product.products"
    :key="`review-${index}`"
    :review="review"
  >
    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <a>
        <button
          class="w-full h-56 bg-cover rounded-md"
          :style="{ backgroundImage: `url('${review.image_url}')` }"
        >
          <span class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4"
            >자세히 보기 후기</span
          >
        </button>
      </a>

      <div class="px-5 py-3">
        <h3 class="text-gray-700 uppercase">{{ review.name }}</h3>
        <span class="text-gray-500 mt-2">{{ review.price }}원</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>