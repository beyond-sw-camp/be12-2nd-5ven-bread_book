import { defineStore } from "pinia";
import axios from "axios";

export const useProductReview = defineStore('useProductReview', {
    state: () => ({
        user: [],
        stores: [],
        reviews: [],
    }),
    actions: {
        async fetchproductuser() {
            try {
                // https://3303a3f8-0e68-4434-9c0a-218778f07ccf.mock.pstmn.io//api/userinfo
                const response = await axios.post("/api/member/info");
                if (!response.data || !response.data.user) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }
                this.user = response.data.user;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.user = [];
            }
        },
        async fetchstorereview(idx,page) {
            try {
                const dto ={
                    page:page,
                    memberIdx:idx
                }
                console.log(page);
                const response = await axios.post("/api/review/find",dto);
                this.reviews = response.data.data;
                console.log(this.reviews);
              } catch (error) {
                console.error("Error fetching reviews:", error);
              }
        },
    },
});