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
                const response = await axios.post("https://3303a3f8-0e68-4434-9c0a-218778f07ccf.mock.pstmn.io//api/userinfo");
                if (!response.data || !response.data.user) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }
                this.user = response.data.user;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.user = [];
            }
        },
        async fetchproductstore() {
            try {
                const response = await axios.post("https://3303a3f8-0e68-4434-9c0a-218778f07ccf.mock.pstmn.io//api/userinfo");
                if (!response.data || !response.data.stores) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }
                this.stores = response.data.stores;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.stores = [];// 오류 발생 시 기본값 설정
            }
        },
        async fetchstorereview() {
            try {
                const response = await axios.post("https://3303a3f8-0e68-4434-9c0a-218778f07ccf.mock.pstmn.io//api/userinfo");
                if (!response.data || !response.data.reviews) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }
                this.reviews = response.data.reviews;
                console.log(this.reviews);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.reivews = [];// 오류 발생 시 기본값 설정
            }
        },
    },
});