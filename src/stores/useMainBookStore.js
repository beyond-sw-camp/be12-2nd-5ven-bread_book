import { defineStore } from 'pinia';
import axios from "axios";
export const useMainBookStore = defineStore('mainBookStore', {
   state: () => ({
       books: [],
   }),
   actions: {
       async fetchBooks() {
           try {
               const response = await axios.get('https://9bb3f771-4ccc-43e8-9851-09eccd5742ea.mock.pstmn.io/api/books');
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
               const response = await axios.get('https://14541b30-e040-46fc-b673-f610f6e9dd3c.mock.pstmn.io/api/result');
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
