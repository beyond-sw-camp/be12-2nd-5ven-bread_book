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
                this.ordersList = response.data;
        },



        async pays() {
            const response = await axios.post(
                "https://d09b3780-f25b-445b-9f45-3eecc45c906b.mock.pstmn.io/payList"
            );
            this.paysList = response.data;
        },

        async paymentDetails(paymentId) {
            console.log(paymentId);
            if (paymentId==="4"){
                console.log("test");
                const response = await axios.post(
                    "https://www.breadbook.kro.kr:3000/back/paymentDetails/4"
                );

                return this.details = response.data;
            }else if(paymentId==='1'){
                const response = await axios.post(
                    "https://www.breadbook.kro.kr:3000/back/paymentDetails/1"
                );

                return this.details = response.data;
            }else{
                const response = await axios.post(
                    "https://d09b3780-f25b-445b-9f45-3eecc45c906b.mock.pstmn.io/paymentDetails"
                );

                return this.details = response.data;
            }

            
            
        },

    }
})