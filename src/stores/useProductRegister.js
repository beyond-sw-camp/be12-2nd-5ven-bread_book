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
    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://72fe67fb-06cb-478f-b472-e8cfc2559991.mock.pstmn.io/api/productRegister"
        );
        if (response.data) {
          this.categories = response.data;
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
    async registerProduct(formData) {
      try {
        const response = await axios.post(
          "https://72fe67fb-06cb-478f-b472-e8cfc2559991.mock.pstmn.io/api/productRegister",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("상품 등록 성공:", response.data);
        return response.data;
      } catch (error) {
        console.error("상품 등록 실패:", error);
        throw error;
      }
    },
  },
  getters: {
    mainCategories: (state) => Object.keys(state.categories),
    subCategories: (state) =>
      state.selectedMainCategory
        ? Object.keys(state.categories[state.selectedMainCategory] || {})
        : [],
    subSubCategories: (state) =>
      state.selectedSubCategory
        ? state.categories[state.selectedMainCategory][state.selectedSubCategory] || []
        : [],
  },
});
