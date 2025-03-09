import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('useProductStore', {
    state: () => ({
        products: [],
    }),
    actions: {
        async fetchProducts(idx) {
            try {
                const response = await axios.get(`/api/product/list`);
                this.products = response.data.data;
            } catch (error) {
                console.error("Error fetching reviews:", error)
            }
        }
    }
})