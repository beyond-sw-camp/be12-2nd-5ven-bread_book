import { defineStore } from 'pinia';
import axios from "axios";
export const useResultBookStore = defineStore('resultBookStore', {
    state: () => ({
        books: [],
    }),
    actions: {
        async fetchResult() {
            try {
                const response = await axios.get('https://f1e8f15e-347b-4505-af07-9aeb8e9ff91b.mock.pstmn.io/api/result');
                if (!response.data || !response.data.books) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }
                this.books = response.data.books;
            } catch(error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.books = [];
            }
        }
    },
});
