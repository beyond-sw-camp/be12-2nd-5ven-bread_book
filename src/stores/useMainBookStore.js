import { defineStore } from 'pinia';
import axios from "axios";
export const useMainBookStore = defineStore('mainBookStore', {
    state: () => ({
        books: [],user:{},
    }),
    actions: {
        async myImformation(){
            const response = await axios.post('/api/cookies/user');
                if (response.data) {
                    this.user=response.data;
                    
                    return this.user;
                    
                }
                return null;
        },

        async fetchBooks() {
            try {
                const response = await axios.get('https://dfb612fe-21f4-4377-94c8-75d6777e90fb.mock.pstmn.io/api/books');
                if (!response.data || !response.data.books) {
                    throw new Error('서버에서 유효한 데이터를 응답받지 못했습니다.');
                }

                this.books = response.data.books; // 상태 업데이트
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error.message);
                this.books = []; // 오류 발생 시 기본값 설정
            }
        },
        async fetchResult() {
            try {
                const response = await axios.get('https://c85df50f-964a-4e8b-a484-f6615ad011c5.mock.pstmn.io/api/search_result');
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
