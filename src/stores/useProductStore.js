import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({products: {}}),
    actions: {
        async fetchProducts() {
            const response = await axios.post("https://7c3f7126-4cf0-417f-8352-aa0995152557.mock.pstmn.io//aip/myproductdetail");
            console.log(response)
            this.products = response.data.products;
        }
    }
})