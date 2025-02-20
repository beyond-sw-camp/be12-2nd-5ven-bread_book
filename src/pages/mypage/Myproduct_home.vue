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
              <div class="w-28 h-28 rounded-full overflow-hidden items-center">
                <img
                  :src="user.user.image_url"
                  alt="프로필 이미지"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- 상점 정보 컨테이너 -->
              <div class="mt-2 md:mt-0 text-center md:text-center items-center">
                <!-- 상점 이름 -->
                <h1 class="text-2xl font-semibold text-black">
                  {{ user.user.username }}
                </h1>

                <div class="mt-4 md:mt-0 flex" style="margin-left: 15px">
                  <router-link
                    class="text-center md:text-center w-36 h-8 mx-2 my-1 bg-black border border-bleak text-white rounded hover:bg-bleak hover:bg-opacity-20 transition duration-300 font-semibold text-sm flex items-center justify-center "
                    to="/paymentList/test1"
                  >
                    <span class="mr-2">내 거래 내역</span>
                  </router-link>
                </div>
               <!-- v-if="isLogin" -->  
                <div class="mt-4 md:mt-0 flex" style="margin-left: 15px">
                  <router-link
                    class="text-center md:text-center w-36 h-8 mx-2 my-1 bg-black border border-bleak text-white rounded hover:bg-bleak hover:bg-opacity-20 transition duration-300 font-semibold text-sm flex items-center justify-center "
                    to="/myinfochange"
                  >
                    <span class="mr-2">프로필 수정</span>
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
                  src="https://github.com/beyond-sw-camp/be12-2nd-5ven-bread_book/blob/main/assets/img/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98.png?raw=true"
                  alt="아이콘"
                  class="w-4 h-4 mr-2"
                />
                <span>빵등급</span>
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