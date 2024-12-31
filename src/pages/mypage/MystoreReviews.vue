<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductReview } from "../../stores/useProductReview";

const review = useProductReview();
const visibleReviewCount = ref(3);
const showMoreCount = 3;

const visibleReviews = computed(() => {
  return review.reviews.slice(0, visibleReviewCount.value);
});

const showMoreButton = computed(() => {
  return visibleReviewCount.value < review.reviews.length;
});

const showMoreReviews = () => {
  visibleReviewCount.value += showMoreCount;
};

onMounted(async () => {
  await review.fetchstorereview();
});
</script>

<script>
export default {
  name: "MystoreReviews",
};
</script>


<template>
  <div class="container mx-auto px-6">
    <div
      v-for="(review, index) in visibleReviews"
      :key="`review-${index}`"
      :review="review"
      class="review-item flex flex-col md:flex-row md:items-start mx-auto max-w-6xl"
    >
      <div class="w-full p-4 md:w-1/5">
        <a href="#" class="flex-shrink-0 mt-2 md:mt-4">
          <div class="w-15 h-15 bg-gray-100 rounded-full overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2135/2135665.png"
              alt="리뷰어 이미지"
              class="w-full h-full object-cover"
            />
          </div>
        </a>
      </div>

      <div class="w-full md:w-4/5 p-4">
        <div class="flex items-center pb-4">
          <a href="#" class="text-sm font-medium">{{ review.userid }}</a>
          <div class="text-xs text-gray-500">{{ review.reviewday8 }} 일 전</div>
        </div>

        <a href="#" class="inline-block">
          <button
            class="flex items-center space-x-1 bg-gray-100 rounded px-2 mt-4 text-sm"
          >
            <span>{{ review.itemname }}</span>
            ←
          </button>
        </a>

        <div
          class="mt-4 text-gray-700 text-sm leading-relaxed rounded-lg p-3 max-h-32 overflow-y-auto"
        >
          {{ review.comment }}
        </div>

        <div class="border-t mt-4 pt-3 text-right">
          <a class="text-sm text-blue-500 hover:underline"> 신고하기 </a>
        </div>
      </div>
    </div>

    <div v-if="showMoreButton" class="text-center mt-6">
      <button
        @click="showMoreReviews"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        더보기
      </button>
    </div>
  </div>
</template>


<style scoped></style>