import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductReadStore = defineStore('productRead', {
    state: () => ({
        scoreCategory: "",
        sellerName: "",
        category: "",
        book: {},
        books: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        pageSize: 16,
        isLastPage: false,
    }),
    actions: {
        async fetchProducts(page = 0, size = 24) {
            try {
                const response = await axios.get(`/api/product/list`, {
                    params: { page, size },
                });
                if (response.data.isSuccess) {
                    const data = response.data.data;
                    this.books = data.content.map((book) => ({
                        ...book,
                        firstImageUrl: `/api/images/${book.firstImageUrl}`,
                        wishCanceled: String(book.wishCanceled) === 'true',
                        bookCondition: book.bookCondition === "GOOD" ? "좋음" : book.bookCondition === "NORMAL" ? "보통" : "헌책",
                    }));
                    this.totalPages = data.totalPages;
                    this.totalElements = data.totalElements;
                    this.currentPage = data.number;
                    this.pageSize = data.size;
                    this.isLastPage = data.last;
                    console.log('책 목록을 성공적으로 불러왔습니다:', this.books);
                } else { console.error('API 요청 실패:', response.data.message);}
            } catch (error) { console.error('책 목록을 불러오는 중 오류 발생:', error);}
        },
        
        async fetchProductItem(productIdx) {
            try {
                const response = await axios.get(`/api/product/${productIdx}`, {
                    params: { productIdx },
                });
                if (response.data.isSuccess) {
                    const data = response.data.data;
                    this.book = data.book;
                    this.scoreCategory = data.scoreCategory;
                    this.sellerName = data.sellerName;
                    return {
                        ...data,
                        firstImageUrl: `/api/${data.firstImageUrl}`,
                        wishCanceled: String(data.wishCanceled) === 'true',
                        bookCondition: data.bookCondition === "GOOD" ? "좋음" : data.bookCondition === "NORMAL" ? "보통" : "헌책",
                    };
                } else { console.error('API 요청 실패:', response.data.message);}
            } catch (error) { console.error('책 정보를 불러오는 중 오류 발생:', error);}
        },

        changePage(newPage) {
            if (newPage >= 0 && newPage < this.totalPages) {
                this.fetchProducts(newPage, this.pageSize);
            }
        },
    },
});