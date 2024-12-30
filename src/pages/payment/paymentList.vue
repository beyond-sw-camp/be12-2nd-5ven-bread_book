<script setup>
import Menu from "./paymentComponents/menu.vue";
import orderList from './paymentComponents/orderList.vue';
import payList from './paymentComponents/payList.vue';
import { usePaymentStore } from "../../stores/paymentStore";
import { onMounted,computed } from 'vue';


// Pinia 스토어에서 상태 가져오기
const paymentStore = usePaymentStore();

// statusMenu와 chooseMenu 상태를 반응형으로 받아오기
const chooseMenu = computed(() => paymentStore.statusMenu);


onMounted(async () => {
    await paymentStore.pays();
    await paymentStore.orders();
});
</script>

<template>
    <div style="display: flex; justify-content: center; margin-top: 50px;">
        <div class="container">
            <div class="title">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img">
                    <path
                        d="M14.265 19.537a.9.9 0 1 0 1.27-1.274l-8.362-8.34 8.365-8.387A.9.9 0 0 0 14.263.264l-9 9.024a.902.902 0 0 0 .002 1.273l9 8.976z"
                        fill="#1e1d29" fill-rule="evenodd"></path>
                </svg>
                <h1 class="paymentList"><strong>거래내역</strong></h1>
            </div>

            <Menu></Menu>

            <div class="search wrap">
                <label for="voice-search" class="sr-only">Search</label>
                <div class="relative w-full wrap">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="voice-search" autocomplete="off"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="상품명으로 검색" required="">
                </div>
            </div>
            
            <div v-if="chooseMenu==='buy'">
                <payList></payList>
            </div>
            <div v-else>
                <orderList></orderList>
                
            </div>
            
        </div>
    </div>
</template>


<style lang="css" scoped>
body {
    display: flex;
    justify-content: center;
}

.container {
    width: 70% !important;
}

.title {
    display: flex;
    align-items: center;
    padding: 0px 20px;
}

.wrap {
    display: flex;
}

.paymentList {
    font-size: 18px;
    margin-left: 10px;
}


#voice-search {
    border-radius: 5px;
    font-weight: 700;
}

.search {
    max-width: 100%;
    margin: 15px 5%;
    justify-items: center;
}

.search .relative.w-full {
    justify-content: center;
    height: 45px;
}

.search .BTN {
    height: 45px;
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    padding: 11px 12px 10px;
    border-radius: 6px;
    box-shadow: rgb(229, 229, 229) 0px 0px 0px 1px inset;
}
</style>