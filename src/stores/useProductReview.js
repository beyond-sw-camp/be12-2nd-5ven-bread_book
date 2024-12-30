import { defineStore } from "pinia";
import axios from "axios";

export const useProductReview = defineStore('useProductReview', {
    state: () => ({
        user: [],
        products: [],
    }),
    actions: {
        async fetchproductuser() {
            try {
                const response = await axios.post("https://7c3f7126-4cf0-417f-8352-aa0995152557.mock.pstmn.io/aip/myproductdetail");
                if (!response.data || !response.data.user) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }

                this.user = response.data.user;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.user = [];
            }

            console.log(this.user);
            console.log(this.user.image_url);
        },
        async fetchproductreview() {
            try {
                const response = await axios.post("https://7c3f7126-4cf0-417f-8352-aa0995152557.mock.pstmn.io/aip/myproductdetail");
                if (!response.data || !response.data.products) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }

                this.products = response.data.products;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.products = [];// 오류 발생 시 기본값 설정
            }
        },
    },
});