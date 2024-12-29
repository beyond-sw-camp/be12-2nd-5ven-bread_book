<script setup>
import { watch,onMounted,ref } from "vue";
import { usePaymentStore } from "../../../stores/paymentStore";

const paymentStore = usePaymentStore();
const option = ref("");

// onMounted에서 option 값 설정
onMounted(() => {
    option.value = "전체";  // 올바른 값 할당 방식
});

watch(
  () => paymentStore.option,
  (newValue) => {
    option.value=newValue;
  },{ immediate: true }
);

</script>

<template>
    <div v-for="pay in paymentStore.paysList" :key="pay.id">
        <div class="product wrap" v-if="option==='전체' || option===pay.product_status">
            <div class="product-main">
                <div class="date wrap">
                    <strong>{{ pay.orders_created_at }}</strong>
                    <button style="margin-left: auto;">
                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img">
                            <path
                                d="M5.262 19.536a.9.9 0 0 0 1.273 0l9-8.974a.905.905 0 0 0 .265-.636.904.904 0 0 0-.263-.637l-9-9.024a.9.9 0 1 0-1.275 1.27l8.365 8.388-8.363 8.34a.9.9 0 0 0-.002 1.273"
                                fill="#7f7f7f" fill-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <hr>

                <div id="paymentStatus">{{ pay.product_status }}</div>

                <div class="product-details wrap">
                    <router-link :to="`/paymentDetails/${pay.orders_id}`">
                        <img :src="pay.book_image" alt="">
                        <div class="product-details-information">
                            <strong>{{pay.amount}}원</strong>
                            <div class="product-details-name">{{ pay.title }}</div>
                            <div class="product-details-seller">{{pay.username}}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.wrap {
    display: flex;
}

.product.wrap {
    justify-content: center;
    margin-bottom: 10px;
}

.product-main {
    border: 1px solid rgb(229, 229, 229);
    border-radius: 6px;
    width: 90%;
}

.date.wrap {
    align-items: center;
    padding: 16px 20px;
    font-size: 14px;
    ;
}

#paymentStatus {
    font-weight: bolder;
    padding: 8px 16px;
}

.product-details.wrap {
    padding: 0px 16px;
}

.product-details.wrap a {
    width: 100%;
    display: flex;
}

.product-details img {
    width: 65px;
    height: 65px;
    border-radius: 5px;
}

.product-details-information {
    margin-left: 10px;
    margin-bottom: 15px;
}

.product-details-name {
    font-size: 13px;
    color: rgb(102, 102, 102);
}

.product-details-seller {
    font-size: 13px;
    color: rgb(140, 140, 140);
}

.product-main hr {
    width: 95%;
    margin: 0 auto;
}

#reviewBTN {
    width: 97% !important;
    display: block;
    margin: 0 auto;
    margin-bottom: 16px;
}
</style>