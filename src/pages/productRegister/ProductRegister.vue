<script setup>
import { onMounted, computed } from "vue";
import { useProductRegisterStore } from "../../stores/useProductRegister.js";
import { useLoadingStore } from "../../stores/useLoadingStore.js";

const productRegisterStore = useProductRegisterStore();
const loadingStore = useLoadingStore();

onMounted(async() => {
  loadingStore.startLoading();
  await productRegisterStore.fetchCategories();
  loadingStore.stopLoading();
});

const mainCategories = computed(() => productRegisterStore.mainCategories);
const subCategories = computed(() => productRegisterStore.subCategories);
const subSubCategories = computed(() => productRegisterStore.subSubCategories);

const selectMainCategory = (category) => {
  productRegisterStore.selectMainCategory(category);
};

const selectSubCategory = (subCategory) => {
  productRegisterStore.selectSubCategory(subCategory);
};

const selectSubSubCategory = (subSubCategory) => {
  productRegisterStore.selectSubSubCategory(subSubCategory);
};
</script>

<template>
  <div class="bg-white">
    <main class="container w-[60%] mx-auto p-4 pt-24">
      <!-- 상품 정보 섹션 -->
      <section>
        <h2 class="text-3xl font-semibold text-gray-800 mb-6">상품정보</h2>

        <!-- 상품 이미지 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">상품 이미지 <small>(0/12)</small></label>
          <div class="relative w-3/4">
            <div
              class="w-64 h-64 border border-gray-300 rounded-md flex items-center justify-center bg-indigo-50 text-gray-700 cursor-pointer">
              <label for="file-upload" class="w-full h-full flex flex-col items-center justify-center">
                <img src="../../assets/icon/upload-minimalistic-svgrepo-com.svg" alt="업로드 아이콘" class="w-16 h-16 mb-2" />
                <span class="text-sm font-medium">이미지 업로드</span>
                <small class="text-xs text-gray-500">(jpg, jpeg, png)</small>
                <input id="file-upload" type="file" accept="image/jpg, image/jpeg, image/png" multiple class="hidden" />
              </label>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여집니다.
            </p>
          </div>
        </div>

        <!-- 상품명 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label for="productName" class="text-2xl font-semibold text-gray-700 w-1/4">상품명</label>
          <div class="relative w-3/4">
            <input type="text" id="productName" placeholder="상품명을 입력해 주세요."
              class="w-full p-2 pr-40 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            <a href="https://help.bunjang.co.kr/faq/2/220" target="_blank"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-red-600 underline">
              거래금지 품목 보기
            </a>
          </div>
        </div>


        <div class="flex flex-col border-t border-gray-300 pt-4">
  <!-- 상단: "카테고리 선택"과 카테고리 상자 -->
  <div class="flex w-full">
    <!-- "카테고리 선택" 텍스트 -->
    <h3 class="text-2xl font-semibold text-gray-700 w-1/4">카테고리 선택</h3>

    <!-- 카테고리 박스 전체 -->
    <div class="flex w-3/4 space-x-4">
      <!-- 메인 카테고리 -->
      <div class="flex-1 border rounded-md p-4 bg-gray-50">
        <h4 class="font-bold mb-2">메인 카테고리</h4>
        <ul>
          <li v-if="mainCategories.length === 0" class="text-gray-500">
            카테고리를 불러오는 중입니다...
          </li>
          <li v-for="category in mainCategories" :key="category" class="mb-2">
            <button
              @click="selectMainCategory(category)"
              :class="{
                'bg-red-100 text-red-500 font-bold': productRegisterStore.selectedMainCategory === category,
                'bg-gray-100 text-black': productRegisterStore.selectedMainCategory !== category
              }"
              class="px-4 py-2 rounded-md hover:bg-gray-200 w-full text-left"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </div>

      <!-- 서브 카테고리 -->
      <div
        class="flex-1 border rounded-md p-4 bg-gray-50"
        v-if="productRegisterStore.selectedMainCategory"
      >
        <h4 class="font-bold mb-2">서브 카테고리</h4>
        <ul>
          <li v-for="subCategory in subCategories" :key="subCategory" class="mb-2">
            <button
              @click="selectSubCategory(subCategory)"
              :class="{
                'bg-red-100 text-red-500 font-bold': productRegisterStore.selectedSubCategory === subCategory,
                'bg-gray-100 text-black': productRegisterStore.selectedSubCategory !== subCategory
              }"
              class="px-4 py-2 rounded-md hover:bg-gray-200 w-full text-left"
            >
              {{ subCategory }}
            </button>
          </li>
        </ul>
      </div>

      <!-- 서브서브 카테고리 -->
      <div
        class="flex-1 border rounded-md p-4 bg-gray-50"
        v-if="productRegisterStore.selectedSubCategory"
      >
        <h4 class="font-bold mb-2">세부 카테고리</h4>
        <ul>
          <li v-for="subSubCategory in subSubCategories" :key="subSubCategory" class="mb-2">
            <button
              @click="selectSubSubCategory(subSubCategory)"
              :class="{
                'bg-red-100 text-red-500 font-bold': productRegisterStore.selectedSubSubCategory === subSubCategory,
                'bg-gray-100 text-black': productRegisterStore.selectedSubSubCategory !== subSubCategory
              }"
              class="px-4 py-2 rounded-md hover:bg-gray-200  w-full text-left"
            >
              {{ subSubCategory }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 하단: 선택된 카테고리 -->
  <div class="flex w-full mt-4">
    <!-- 빈 공간 맞춤 -->
    <div class="w-1/4"></div>

    <!-- 선택된 카테고리 -->
    <div class="w-3/4 mb-2">
      <span class="text-lg text-red-500 font-bold">선택한 카테고리:</span>
      <span class="text-lg font-bold ml-2">
        {{ productRegisterStore.selectedMainCategory }}
      </span>
      <span v-if="productRegisterStore.selectedSubCategory" class="text-lg font-bold ml-2">
        >&nbsp;{{ productRegisterStore.selectedSubCategory }}
      </span>
      <span v-if="productRegisterStore.selectedSubSubCategory" class="text-lg font-bold ml-2">
        >&nbsp;{{ productRegisterStore.selectedSubSubCategory }}
      </span>
    </div>
  </div>
</div>



        <!-- 상품 상태 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">상품 상태</label>
          <div class="w-3/4 space-y-2">
            <label class="flex items-center">
              <input type="radio" name="condition" value="new" class="mr-2" />
              새 상품 (미사용)
            </label>
            <label class="flex items-center">
              <input type="radio" name="condition" value="like-new" class="mr-2" />
              사용감 없음
            </label>
            <label class="flex items-center">
              <input type="radio" name="condition" value="used-light" class="mr-2" />
              사용감 적음
            </label>
            <label class="flex items-center">
              <input type="radio" name="condition" value="used-heavy" class="mr-2" />
              사용감 많음
            </label>
          </div>
        </div>

        <!-- 설명 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label for="description" class="text-2xl font-semibold text-gray-700 w-1/4">설명</label>
          <div class="w-3/4">
            <textarea id="description" rows="5" placeholder="브랜드, 모델명, 구매 시기 등을 입력해주세요."
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            <p class="mt-2 text-sm text-gray-500">
              개인정보 입력은 제한될 수 있습니다.
            </p>
            <div class="mt-1 text-sm text-gray-500 text-right">0/2000</div>
          </div>
        </div>

        <!-- 가격 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">가격</label>
          <div class="w-3/4">
            <div class="flex items-center gap-2">
              <input type="text" placeholder="가격 입력"
                class="w-40 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <span class="text-gray-700">원</span>
            </div>
          </div>
        </div>

        <!-- 배송비 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">배송비</label>
          <div class="w-3/4 flex items-center gap-4">
            <label class="flex items-center">
              <input type="radio" name="shipping" value="included" class="mr-2" />
              배송비 포함
            </label>
            <label class="flex items-center">
              <input type="radio" name="shipping" value="excluded" class="mr-2" />
              배송비 별도
            </label>
          </div>
        </div>

        <!-- 직거래 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">직거래</label>
          <div class="w-3/4 flex items-center gap-4">
            <label class="flex items-center">
              <input type="radio" name="directDeal" value="possible" class="mr-2" />
              가능
            </label>
            <label class="flex items-center">
              <input type="radio" name="directDeal" value="impossible" class="mr-2" />
              불가
            </label>
          </div>
        </div>

        <!-- 수량 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">수량</label>
          <div class="w-3/4">
            <div class="flex items-center gap-2">
              <input type="text" placeholder="수량 입력"
                class="w-40 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <span class="text-gray-700">개</span>
            </div>
          </div>
        </div>

        <!-- 등록 버튼 -->
        <div class="text-right border-t border-gray-300 pt-4">
          <button class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition mr-2">
            임시저장
          </button>
          <button class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            등록하기
          </button>
        </div>
      </section>
    </main>

  </div>
</template>



<style lang="scss" scoped></style>