import { defineStore } from 'pinia';
import axios from "axios";
export const useMainBookStore = defineStore('mainBookStore', {
   state: () => ({
       books: [],
   }),
   actions: {
       async fetchBooks() {
           try {
               const response = await axios.get('https://b4c6a014-ef2c-421a-b258-1b7a7db732de.mock.pstmn.io/api/home');
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
               const response = await axios.get('https://a0c29ce7-b389-4ffa-98e6-c03fa22af3cf.mock.pstmn.io/api/result');
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
