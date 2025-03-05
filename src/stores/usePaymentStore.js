import axios from "axios";
import { defineStore } from 'pinia';

// 로그인 된 유저의 id 추가
export const usePaymentStore = defineStore('payment', {
    state: () => ({
        statusMenu: null, ordersList: [], paysList: [], option: null, details: null
    }),
    actions: {
        chooseMenuList(newStatusMenu) {
            this.statusMenu = newStatusMenu;
            return this.statusMenu;
        },

        chooseStateList(newOption) {
            if (this.statusMenu === 'buy') {
                
                if (newOption === "status-fin") {
                    return this.option = "품절";
                } else if (newOption === "status-ing") {
                    return this.option = '판매중';
                } else {
                    return this.option = "전체";
                }

            }
            else {
                
                if (newOption === "status-fin") {
                    return this.option = "품절";
                } else if (newOption === "status-ing") {
                    return this.option = '거래중';
                } else {
                    return this.option = "전체";
                }

            }
        },

        async orders(idx) {
            console.log(idx);
            const response = await axios.post("/api/order/orderList",{idx:idx});
            this.ordersList = response.data.data;
        },



        async pays(idx) {
            const response = await axios.post("/api/order/payList",{idx:idx});
            console.log(response.data);
            this.paysList = response.data.data;
        },

        async paymentDetails(idx) {
            const response = await axios.post(
                `/api/order/orderDetails/${idx}`
            );
            console.log(response.data.data);
            return response.data.data;
            
        },

    }
})