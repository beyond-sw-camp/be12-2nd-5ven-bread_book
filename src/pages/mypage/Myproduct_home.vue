<script>
import axios from "axios";
import myproductstores from "./Myproductstores.vue";
import mystoreReviews from "./MystoreReviews.vue";

export default {
  name: "Myproduct_Home",
  components: { myproductstores, mystoreReviews },
  data() {
    return {
      user: {}, // 사용자 데이터
      products: [], // 제품 데이터
      review: [],
      flag: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    followUser() {
      alert("팔로우되었습니다.");
    },
    async fetchData() {
      try {
        // Postman에서 데이터를 가져오는 Axios 요청
        const response = await axios.post(
          "https://7c3f7126-4cf0-417f-8352-aa0995152557.mock.pstmn.io/aip/myproductdetail"
        ); // 여기에 API URL 입력
        console.log(response);
        this.user = response.data.user; // 사용자 데이터 저장

        this.products = response.data.products; // 제품 데이터 저장
        console.log(this.products);
        this.review = response.data.products; //리뷰 추후에 수정
        console.log(this.review);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    },
  },
};
</script>

<template>
  <div class="bg-white">
    <!-- header -->

    <!-- title -->

    <!-- 상단버튼 -->
    <main class="my-8">
      <div class="container mx-auto px-6">
        <div class="md:flex md:items-center">
          <!-- 좌측 프로필 섹션 -->
          <div
            class="flex flex-col items-center p-4 md:flex-row md:justify-between bg-gray-100 rounded-lg shadow"
          >
            <!-- 프로필 섹션 -->

            <div class="flex flex-col items-center md:flex-row md:space-x-4">
              <!-- 프로필 카드 전체를 묶는 부모 컨테이너 -->
              <!-- h-full w-full rounded-md object-cover max-w-lg mx-auto -->

              <div class="flex flex-col items-center md:flex-row md:space-x-4">
                <!-- 프로필 이미지 -->
                <div
                  class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
                >
                  <img
                    :src="user.image_url"
                    alt="프로필 이미지"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- 상점 정보 컨테이너 -->
                <div class="mt-4 md:mt-0 text-center md:text-left">
                  <!-- 상점 이름 -->
                  <div class="text-lg font-semibold text-gray-800">
                    {{ user.username }}
                  </div>
                  <!-- 별점 -->
                  <div
                    class="lex justify-center md:justify-start space-x-1 mt-1"
                  >
                    ★ ★ ★ ★ ★
                  </div>

                  <!-- 상품 및 팔로워 -->
                  <div
                    class="flex justify-center md:justify-start mt-4 md:mt-0 space-x-4"
                  >
                    <a href="#" class="text-blue-500 hover:underline">
                      상품 <b>{{ user.products }}</b>
                    </a>
                    <a href="#" class="text-blue-500 hover:underline">
                      팔로워 <b>{{ user.followers }}</b>
                    </a>
                  </div>
                  <!-- 팔로우 버튼 -->
                  <div class="mt-4 md:mt-0">
                    <button
                      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      @click="followUser"
                    >
                      <span class="mr-2">👤</span> 팔로우
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 우측 상점 정보 섹션 -->

          <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <!-- 상단 헤더 -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="text-xl font-bold text-gray-800">
                {{ user.username }}
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
                <img src="#" alt="아이콘" class="w-4 h-4 mr-2" />
                <span>상점오픈일</span>
                <span class="ml-auto text-gray-500"
                  >{{ user.store_open_days }} 일 전</span
                >
              </div>
              <div class="flex items-center">
                <img src="#" alt="아이콘" class="w-4 h-4 mr-2" />
                <span>상점방문수</span>
                <span class="ml-auto text-gray-500"
                  >{{ user.store_visits }} 명</span
                >
              </div>
              <div class="flex items-center">
                <img src="#" alt="아이콘" class="w-4 h-4 mr-2" />
                <span>상품판매</span>
                <span class="ml-auto text-gray-500">{{ user.sales }}회</span>
              </div>
            </div>
            <!-- 스크롤 가능한 박스 -->
            <div
              class="mt-4 text-gray-700 text-sm leading-relaxed border rounded-lg p-3 max-h-32 overflow-y-auto"
            >
              <!-- 상점 설명 -->
              <div>
                {{ user.textmessage }}
              </div>
            </div>

            <!-- 신고하기 -->
            <div class="border-t mt-4 pt-3 text-right">
              <a href="#" class="text-sm text-blue-500 hover:underline"
                >신고하기</a
              >
            </div>
          </div>
        </div>

        <div class="mt-16">
          <!-- 이부분은 추후에 데이터값 할당해주고, 링크도 넣어줘야함. -->
          <nav
            class="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-6"
          >
            <router-link
              class="text-center p-4 border rounded shadow hover:bg-gray-100"
              to="/myproduct_home/myproductstores" @click="flag = true"
            >
              상품
              <span class="nav-link font-bold text-blue-500">
                {{ user.products }}
              </span>
            </router-link>

            <router-link
              class="text-center p-4 border rounded shadow hover:bg-gray-100"
              to="/myproduct_home/mystoreReviews" @click="flag = false"
            >
              상점후기
              <span class="nav-link font-bold text-blue-500">
                {{ user.store_reviews }}
              </span>
            </router-link>
          </nav>
            <!-- <div v-if="products.length > 3">
              <myproductstore
                v-for="(product, index) in products"
                :key="`product-${index}`"
                :product="product"
              />
            </div>

            <div v-if="review.length > 3">
              <mystoreReviews
                v-for="(review, index) in review"
                :key="`review-${index}`"
                :review="review"
              />
            </div>
            <router-view></router-view> -->
            <!-- <router-view> -->
              <div v-if="flag && products &&
                products.length > 0" 
                class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                <myproductstores 
                  v-for="(product, index) in products"
                  :key="`product-${index}`"
                  :product="product"
                />
              </div>

              <div v-if="!flag && review &&
                review.length > 0"
                class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                <mystoreReviews
                  v-for="(review, index) in review"
                  :key="`review-${index}`"
                  :review="review"
                />
              </div>
            <!-- </router-view> -->
            <!--카드들-->
          
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>