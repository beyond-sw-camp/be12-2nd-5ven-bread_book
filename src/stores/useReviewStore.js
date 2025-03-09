import { defineStore } from "pinia";
import axios from "axios";

export const useReviewStore = defineStore('useProductReview', {
    state: () => ({
        reviews: [],
    }),
    actions: {
        async fetchstorereview(idx) {
            try {
                const response = await axios.get(`/api/review/${idx}`);
                this.reviews = response.data.data;
              } catch (error) {
                console.error("Error fetching reviews:", error);
              }
        },
    },
});