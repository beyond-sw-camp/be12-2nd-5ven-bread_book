import { defineStore } from "pinia";
import axios from "axios";

export const useProductRegisterStore = defineStore("productRegister", {
  state: () => ({
    categories: {}, // 카테고리 데이터를 저장
    selectedMainCategory: null,
    selectedSubCategory: null,
    selectedSubSubCategory: null,
  }),
  actions: {
    // Mock API에서 카테고리 데이터를 가져오기
    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://72fe67fb-06cb-478f-b472-e8cfc2559991.mock.pstmn.io/api/productRegister"
        );
        if (response.data) {
          this.categories = response.data; // JSON 데이터 저장
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    selectMainCategory(category) {
      this.selectedMainCategory = category;
      this.selectedSubCategory = null;
      this.selectedSubSubCategory = null;
    },
    selectSubCategory(subCategory) {
      this.selectedSubCategory = subCategory;
      this.selectedSubSubCategory = null;
    },
    selectSubSubCategory(subSubCategory) {
      this.selectedSubSubCategory = subSubCategory;
    },
  },
  getters: {
    // 최상위 카테고리
    mainCategories: (state) => Object.keys(state.categories),
    // 선택된 메인 카테고리의 서브 카테고리
    subCategories: (state) =>
      state.selectedMainCategory
        ? Object.keys(state.categories[state.selectedMainCategory] || {})
        : [],
    // 선택된 서브 카테고리의 서브-서브 카테고리
    subSubCategories: (state) =>
      state.selectedSubCategory
        ? state.categories[state.selectedMainCategory][state.selectedSubCategory] || []
        : [],
  },
});
