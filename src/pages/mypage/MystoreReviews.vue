<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductReview } from "../../stores/useProductReview";
import { useRoute } from "vue-router";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";


const route = useRoute();
const idx = route.params.idx;

const review = useProductReview();
const visibleReviewCount = ref(3);
const showMoreCount = 3;

// 리뷰를 idx 기준으로 내림차순 정렬
const sortedReviews = computed(() => {
  return review.reviews.slice().sort((a, b) => b.idx - a.idx);
});


// 시간차 
// npm install date-fns
// 으로 date-fns설치하고 코드 작성 해야함.
const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true, locale: ko
  });
};

// 화면에 표시할 리뷰 계산
const visibleReviews = computed(() => {
  return sortedReviews.value.slice(0, visibleReviewCount.value);
});

const showMoreButton = computed(() => {
  return visibleReviewCount.value < review.reviews.length;
});

const showMoreReviews = () => {
  visibleReviewCount.value += showMoreCount;
};

onMounted(async () => {
  await review.fetchstorereview(idx); // idx 전달
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
      v-for="(review, idx) in visibleReviews"
      :key="`review-${idx}`" :review="review"
      class="review-item flex flex-col md:flex-row md:items-start mx-auto max-w-6xl">
      <div class="w-full p-4 md:w-1/5">
        <router-link to="/myproduct_home/myproductstores"
        class="flex-shrink-0 mt-2 md:mt-4">
            <div class="w-20 h-20 bg-gray-100 rounded-full overflow-hidden">
              <img
                :src="review.userimageurl"
                alt="리뷰어 이미지"
                class="w-full h-full object-cover"
              />
            </div>
        </router-link>
      </div>

      <div class="w-full md:w-4/5 p-4">
        <div class="flex items-center pb-4">
          <router-link to="/myproduct_home/myproductstores" class="text-sm font-medium">{{
            review.userid
          }}</router-link>
          <div class=" text-xs text-gray-500" style="margin-left: 10px;">{{ formatTimeAgo(review.createtime) }}</div>
        </div>

        <router-link :to="`/product_detail/${idx+1}`" class="inline-block">
          <button
            class="flex items-center space-x-1 bg-gray-100 rounded px-2 mt-4 text-sm"
          >
            <span>{{ review.itemname }}</span>
            ←
          </button>
        </router-link>

        <div
          class="mt-4 text-gray-700 text-sm leading-relaxed rounded-lg p-3 max-h-32 overflow-y-auto"
        >
          {{ review.content }}
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