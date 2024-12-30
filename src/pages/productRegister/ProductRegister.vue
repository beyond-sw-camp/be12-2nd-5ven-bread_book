<script setup>
import { useProductRegisterStore } from "../../stores/useProductRegister.js";
import { ref, onMounted, computed } from "vue";
import { useLoadingStore } from "../../stores/useLoadingStore.js";

const productRegisterStore = useProductRegisterStore();
const loadingStore = useLoadingStore();

// 폼 데이터
const productName = ref("");
const condition = ref("");
const description = ref("");
const price = ref(0);
const shipping = ref("");
const directDeal = ref("");
const quantity = ref(1);
const images = ref([]);

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    images.value = files.map((file) => ({
      file, // 파일 객체 추가
      name: file.name, // 파일 이름 추가
      preview: URL.createObjectURL(file), // 미리보기 URL
    }));
  }
};

const removeImage = () => {
  images.value = [];
};


// 카테고리 선택 값
const selectedMainCategory = ref(null);
const selectedSubCategory = ref(null);
const selectedSubSubCategory = ref(null);

onMounted(async () => {
  loadingStore.startLoading();
  await productRegisterStore.fetchCategories();
  loadingStore.stopLoading();
});

const mainCategories = computed(() => productRegisterStore.mainCategories);
const subCategories = computed(() => productRegisterStore.subCategories);
const subSubCategories = computed(() => productRegisterStore.subSubCategories);

const selectMainCategory = (category) => {
  productRegisterStore.selectMainCategory(category);
  selectedMainCategory.value = category;
  selectedSubCategory.value = null;
  selectedSubSubCategory.value = null;
};

const selectSubCategory = (subCategory) => {
  productRegisterStore.selectSubCategory(subCategory);
  selectedSubCategory.value = subCategory;
  selectedSubSubCategory.value = null;
};

const selectSubSubCategory = (subSubCategory) => {
  productRegisterStore.selectSubSubCategory(subSubCategory);
  selectedSubSubCategory.value = subSubCategory;
};

// 상품 등록 핸들러
const handleRegister = async () => {
  const formData = new FormData();

  formData.append("productName", productName.value);
  formData.append("mainCategory", selectedMainCategory.value);
  formData.append("subCategory", selectedSubCategory.value);
  formData.append("subSubCategory", selectedSubSubCategory.value);
  formData.append("condition", condition.value);
  formData.append("description", description.value);
  formData.append("price", parseFloat(price.value)); // 숫자형으로 변환
  formData.append("shipping", shipping.value);
  formData.append("directDeal", directDeal.value);
  formData.append("quantity", parseInt(quantity.value, 10)); // 숫자형으로 변환

  // 이미지 파일 추가
  images.value.forEach((imgObj, index) => {
    formData.append(`images`, imgObj.file);
  });

  try {
    loadingStore.startLoading();
    const response = await productRegisterStore.registerProduct(formData); // POST 요청
    console.log("상품 등록 성공:", response);
    console.log("이미지 데이터 확인:", images.value);

    alert("상품이 성공적으로 등록되었습니다!");
  } catch (error) {
    console.error("상품 등록 실패:", error);
    alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
  } finally {
    loadingStore.stopLoading();
  }
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
          <div class="w-3/4">
            <!-- 업로드 박스 -->
            <div class="w-64 h-64 border border-gray-300 rounded-md bg-indigo-50 text-gray-700 cursor-pointer relative"
              :class="{
                'bg-cover bg-center bg-no-repeat': images.length > 0
              }" :style="{
        backgroundImage: images.length > 0 ? `url(${images[0].preview})` : ''
      }">
              <!-- 업로드 아이콘 및 텍스트 -->
              <label v-if="images.length === 0" for="file-upload"
                class="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0">
                <img src="../../assets/icon/upload-minimalistic-svgrepo-com.svg" alt="업로드 아이콘" class="w-16 h-16 mb-2" />
                <span class="text-sm font-medium">이미지 업로드</span>
                <small class="text-xs text-gray-500">(jpg, jpeg, png)</small>
              </label>
              <input id="file-upload" type="file" accept="image/jpg, image/jpeg, image/png" class="hidden"
                @change="handleFileChange" />

              <!-- 이미지 제거 버튼 -->
              <button v-if="images.length > 0" @click="removeImage"
                class="absolute bottom-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-xs shadow-md hover:bg-red-600">
                ✕
              </button>
            </div>
          </div>
        </div>


        <!-- 상품명 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label for="productName" class="text-2xl font-semibold text-gray-700 w-1/4">상품명</label>
          <div class="w-3/4 relative">
            <input type="text" id="productName" v-model="productName" placeholder="상품명을 입력해 주세요."
              class="w-full p-2 pr-40 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            <a href="https://help.bunjang.co.kr/faq/2/220" target="_blank"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-red-600 underline">
              거래금지 품목 보기
            </a>
          </div>
        </div>

        <!-- 카테고리 선택 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">카테고리 선택</label>
          <div class="w-3/4">
            <div class="flex space-x-4">
              <div class="flex-1 border rounded-md p-4 bg-gray-50">
                <h4 class="font-bold mb-2">메인 카테고리</h4>
                <ul>
                  <li v-for="category in mainCategories" :key="category">
                    <button @click="selectMainCategory(category)"
                      :class="{ 'bg-red-100 text-red-500 font-bold': selectedMainCategory === category }"
                      class="px-4 py-2 rounded-md w-full text-left">
                      {{ category }}
                    </button>
                  </li>
                </ul>
              </div>

              <div class="flex-1 border rounded-md p-4 bg-gray-50" v-if="selectedMainCategory">
                <h4 class="font-bold mb-2">서브 카테고리</h4>
                <ul>
                  <li v-for="subCategory in subCategories" :key="subCategory">
                    <button @click="selectSubCategory(subCategory)"
                      :class="{ 'bg-red-100 text-red-500 font-bold': selectedSubCategory === subCategory }"
                      class="px-4 py-2 rounded-md w-full text-left">
                      {{ subCategory }}
                    </button>
                  </li>
                </ul>
              </div>

              <div class="flex-1 border rounded-md p-4 bg-gray-50" v-if="selectedSubCategory">
                <h4 class="font-bold mb-2">세부 카테고리</h4>
                <ul>
                  <li v-for="subSubCategory in subSubCategories" :key="subSubCategory">
                    <button @click="selectSubSubCategory(subSubCategory)"
                      :class="{ 'bg-red-100 text-red-500 font-bold': selectedSubSubCategory === subSubCategory }"
                      class="px-4 py-2 rounded-md w-full text-left">
                      {{ subSubCategory }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <span class="text-lg text-red-500 font-bold">선택된 카테고리: </span>
              <span class="text-lg font-bold ml-2">{{ selectedMainCategory }}</span>
              <span class="text-lg font-bold" v-if="selectedSubCategory"> > {{ selectedSubCategory }}</span>
              <span class="text-lg font-bold" v-if="selectedSubSubCategory"> > {{ selectedSubSubCategory }}</span>
            </div>
          </div>
        </div>

        <!-- 상품 상태 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">상품 상태</label>
          <div class="w-3/4 space-y-2">
            <div><label><input type="radio" name="condition" value="new" v-model="condition" /> 새 상품 (미사용)</label></div>
            <div><label><input type="radio" name="condition" value="like-new" v-model="condition" /> 사용감 없음</label>
            </div>
            <div><label><input type="radio" name="condition" value="used-light" v-model="condition" /> 사용감 적음</label>
            </div>
            <div><label><input type="radio" name="condition" value="used-heavy" v-model="condition" /> 사용감 많음</label>
            </div>
          </div>
        </div>

        <!-- 설명 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label for="description" class="text-2xl font-semibold text-gray-700 w-1/4">설명</label>
          <div class="w-3/4">
            <textarea id="description" v-model="description" rows="5" placeholder="브랜드, 모델명, 구매 시기 등을 입력해주세요."
              class="w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
        </div>

        <!-- 가격 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">가격</label>
          <div class="w-3/4">
            <input type="number" v-model="price" placeholder="가격 입력"
              class="w-40 p-2 border border-gray-300 rounded-md" />&nbsp 원
          </div>
        </div>

        <!-- 배송비 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">배송비</label>
          <div class="w-3/4">
            <label><input type="radio" value="included" v-model="shipping" /> 배송비 포함</label>
            <label><input type="radio" value="excluded" v-model="shipping" /> 배송비 별도</label>
          </div>
        </div>

        <!-- 직거래 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">직거래</label>
          <div class="w-3/4">
            <label><input type="radio" value="possible" v-model="directDeal" /> 가능</label>
            <label><input type="radio" value="impossible" v-model="directDeal" /> 불가</label>
          </div>
        </div>

        <!-- 수량 -->
        <div class="flex items-start mb-6 border-t border-gray-300 pt-4">
          <label class="text-2xl font-semibold text-gray-700 w-1/4">수량</label>
          <div class="w-3/4">
            <input type="number" v-model="quantity" placeholder="수량 입력"
              class="w-40 p-2 border border-gray-300 rounded-md" />&nbsp개
          </div>
        </div>

        <!-- 등록 버튼 -->
        <div class="text-right">
          <button @click="handleRegister" class="px-6 py-2 bg-indigo-600 text-white rounded-md">
            등록하기
          </button>
        </div>
      </section>
    </main>
  </div>
</template>






<style lang="scss" scoped></style>