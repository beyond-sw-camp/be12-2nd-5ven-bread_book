import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({products: {}}),
    actions: {
        async fetchProducts(idx) {
            const response = await axios.get(`/api/product/${idx}`);
            this.products = response.data;
        }
    }
})