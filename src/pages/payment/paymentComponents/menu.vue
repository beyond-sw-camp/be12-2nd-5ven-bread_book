<script setup>
import { ref,onMounted } from "vue";
import { usePaymentStore } from "../../../stores/usePaymentStore";

let statusMenu = 'sell';
const paymentStore = usePaymentStore();

let statuses = [
    { id: 'status-all', label: '전체' },
    { id: 'status-ing', label: '거래중' },
    { id: 'status-fin', label: '구매완료' },
];

// 초기값을 'status-all'로 설정하여 'on' 클래스를 처음부터 붙이도록 설정
let activeStatus = ref('status-all');

const listMenus = [
    { id: 'sell', label: '구매내역' },
    { id: 'buy', label: '판매내역' },
]

const activeListMenu = ref('sell');
const changeListMenu = (listMenuId) => {
    if (statusMenu !== listMenuId) {
        activeListMenu.value = listMenuId;
        statusMenu = activeListMenu.value;

        paymentStore.chooseMenuList(statusMenu);

        activeStatus = ref('status-all');

        if (statusMenu === "sell") {
            statuses = [
                { id: 'status-all', label: '전체' },
                { id: 'status-ing', label: '거래중' },
                { id: 'status-fin', label: '구매완료' },
            ]
        } else {
            statuses = [
                { id: 'status-all', label: '전체' },
                { id: 'status-ing', label: '판매중' },
                { id: 'status-fin', label: '판매완료' },
            ]
        }
    } 
};

onMounted(()=>{
    paymentStore.chooseMenuList("sell");
});


const changeStatus = (statusId) => {
    activeStatus.value = statusId; // 클릭된 항목에 'on' 클래스를 적용

    paymentStore.chooseStateList(activeStatus.value);
};

</script>

<template>
    <div>
        <div class="history wrap on">
            <div v-for="listMenu in listMenus" :key="listMenu.id" :id="listMenu.id"
                :class="['history-title', { on: activeListMenu === listMenu.id }]" @click="changeListMenu(listMenu.id)">
                <strong>{{ listMenu.label }}</strong>
            </div>
        </div>

        <div id="left" v-if="statusMenu === 'sell'" class="status wrap">
            <div v-for="status in statuses" :key="status.id" :id="status.id"
                :class="['status', { on: activeStatus === status.id }]" @click="changeStatus(status.id)">
                <strong>{{ status.label }}</strong>
            </div>
        </div>

        <div id="right" v-else class="status wrap">
            <div v-for="status in statuses" :key="status.id" :id="status.id"
                :class="['status', { on: activeStatus === status.id }]" @click="changeStatus(status.id)">
                <strong>{{ status.label }}</strong>
            </div>
        </div>
    </div>
</template>


<style lang="css" scoped>
.wrap {
    display: flex;
}

.history-title {
    cursor: pointer;
    width: 50%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgb(178, 178, 178);
    padding: 12px 0px 14px 0px;
}



.history-title.on {
    border-bottom: 3px solid black;
    cursor: default !important;
}

.history-title-menu {
    display: none;
}

.history-title-menu.on {
    display: block;
}

.status.wrap {
    display: flex !important;
}

.status.wrap div {
    border: 1px solid rgb(229, 229, 229);
    border-radius: 21px;
    margin-left: 15px;
    margin-top: 15px;
    padding: 10px 16px;
    color: rgb(102, 102, 102);
    font-size: 14px;
}

.status {
    cursor: pointer;
}

.status.on {
    background-color: black;
    color: white !important;
    cursor: default !important;
}
</style>