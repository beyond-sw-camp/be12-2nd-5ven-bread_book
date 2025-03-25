import axios from "axios";
import { th } from "date-fns/locale";
import { defineStore } from 'pinia';

// 로그인 된 유저의 id 추가
export const usePaymentStore = defineStore('payment', {
    state: () => ({
        statusMenu: null, ordersList: [], paysList: [], option: null, details: null,rimit:false,
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

        async orders(requestData) {
            this.paysList=[]
            const response = await axios.post("/api/order/orderList",requestData);
            if(response.data.code===4001){
                if(this.ordersList.length<1){
                    this.ordersList = response.data.data;
                }else{
                    this.ordersList = [...this.ordersList, ...response.data.data];
                }
            }
            return response.data.isSuccess
        },



        async pays(requestData) {
            this.ordersList=[]
            const response = await axios.post("/api/order/payList",requestData);
            if(response.data.code===4002){
                if(this.paysList.length<1)
                    this.paysList=response.data.data
                else{
                    th.paysList=[...this.paysList,...response.data.data];
                }
            }
            return response.data.isSuccess
        },

        async paymentDetails(idx) {
            const response = await axios.post(
                `/api/order/orderDetails/${idx}`
            );
            console.log(response.data.data);
            return response.data.data;
            
        },

        async reviewRegist(requestData) {
            const response = await axios.post(
                "/api/review/regist",requestData
            );
            console.log(response.data.data);
            return response.data.data;
        },

    }
})