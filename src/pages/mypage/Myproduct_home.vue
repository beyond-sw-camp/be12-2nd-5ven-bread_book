<script setup>
import { onBeforeMount } from "vue";
import myproductstores from "./Myproductstores.vue";
import mystoreReviews from "./MystoreReviews.vue";
import { useProductReview } from "../../stores/useProductReview";

const user = useProductReview();

onBeforeMount(async () => {
  await user.fetchproductuser();
});
</script>

<script>
export default {
  name: "Myproduct_Home",
  components: { myproductstores, mystoreReviews },
};
</script>

<template>
  <div class="pt-16 bg-white">
    <!-- 상단버튼 -->
    <main class="my-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-start mx-auto max-w-6xl">
          <!-- 좌측 프로필 섹션 -->
          <div class="w-full md:w-1/4 p-4">
            <!-- 프로필 섹션 -->
            <div
              class="aspect-square bg-gray-100 rounded-lg flex flex-col justify-center items-center"
            >
              <!-- 프로필 이미지 -->
              <div class="w-32 h-32 rounded-full overflow-hidden">
                <img
                  :src="user.user.image_url"
                  alt="프로필 이미지"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- 상점 정보 컨테이너 -->
              <div class="mt-4 md:mt-0 text-center md:text-left">
                <!-- 상점 이름 -->
                <h1 class="text-2xl font-semibold text-black mb-2">
                  {{ user.user.username }}
                </h1>
                <!-- 팔로우 버튼 -->
                <div class="mt-4 md:mt-0" style="margin-left: 15px">
                  <router-link
                    class="px-2 py-1 bg-transparent border border-bleak text-bleak rounded hover:bg-bleak hover:bg-opacity-20 transition duration-300"
                    to="/paymentList/test1"
                  >
                    <span class="mr-2">내 거래 내역</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- 우측 상점 정보 섹션 -->

          <div class="w-full md:w-3/4 p-4">
            <!-- 상단 헤더 -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="text-xl font-bold text-gray-800">
                {{ user.user.username }}
              </div>

              <div class="text-sm text-gray-500 flex items-center">
                <input
                  type="checkbox"
                  disabled
                  checked
                  id="coding"
                  name="interest"
                  value="coding"
                />
                <label class="text-yellow-400 mr-1">본인인증 완료</label>
              </div>
            </div>

            <!-- 상점 통계 -->
            <div class="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div class="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/420/420199.png"
                  alt="아이콘"
                  class="w-4 h-4 mr-2"
                />
                <span>상점 오픈</span>
                <span class="ml-auto text-gray-500"
                  >{{ user.user.store_open_days }}일 전</span
                >
              </div>
              <div class="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/420/420199.png"
                  alt="아이콘"
                  class="w-4 h-4 mr-2"
                />
                <span>상점 방문수</span>
                <span class="ml-auto text-gray-500"
                  >{{ user.user.store_visits }}명</span
                >
              </div>
              <div class="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3330/3330317.png"
                  alt="아이콘"
                  class="w-4 h-4 mr-2"
                />
                <span>상품 판매</span>
                <span class="ml-auto text-gray-500">{{ user.user.sales }}회</span>
              </div>
            </div>
            <!-- 스크롤 가능한 박스 -->
            <div
              class="mt-4 text-gray-700 text-sm leading-relaxed border rounded-lg p-3 max-h-32 overflow-y-auto"
            >
              <!-- 상점 설명 -->
              <div>
                {{ user.user.textmessage }}
              </div>
            </div>
            <!-- fetchproductreview -->
            <!-- 신고하기 -->
            <div class="border-t mt-4 pt-3 text-right">
              <a href="#" class="text-sm text-blue-500 hover:underline"
                >신고하기</a
              >
            </div>
          </div>
        </div>

        <div class="mt-2">
          <nav
            class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2"
          >
            <router-link
              class="text-center p-4 border rounded shadow hover:bg-gray-100"
              to="/myproduct_home/myproductstores"
              @click="flag = true"
            >
              상품
              <span class="nav-link font-bold text-blue-500">
                {{ user.user.products }}
              </span>
            </router-link>

            <router-link
              class="text-center p-4 border rounded shadow hover:bg-gray-100"
              to="/myproduct_home/mystoreReviews"
              @click="flag = false"
            >
              상점후기
              <span class="nav-link font-bold text-blue-500">
                {{ user.user.store_reviews }}
              </span>
            </router-link>
          </nav>

          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>