<script setup>
import { ref, onMounted } from "vue";
import { usePaymentStore } from "../../stores/usePaymentStore";
import { useLoadingStore } from "../../stores/useLoadingStore"
import { useRoute } from 'vue-router'; // useRoute로 라우트 정보 가져오기

const loadingStore = useLoadingStore();
const paymentStore = usePaymentStore();

// 주문번호호
const route = useRoute();
const idx = route.params.idx; // params에서 id 가져오기

// details를 반응형(ref) 객체로 선언
const details = ref({});

// 비동기 함수 실행 - 컴포넌트가 마운트될 때 호출
onMounted(async () => {
    console.log(idx);
    loadingStore.startLoading(); //데이터 로드 전에 loadingStore.startLoading() 호출.
    const response = await paymentStore.paymentDetails(idx);  // 비동기 작업
    console.log(response);
    details.value = response;
    loadingStore.stopLoading(); // 데이터 로드 후 loadingStore.stopLoading()호출.
});
</script>

<template>
    <div class="body">
        <div class="container">
            <router-link :to="`/paymentList/${details.memberIdx}`" class="title">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img">
                    <path
                        d="M14.265 19.537a.9.9 0 1 0 1.27-1.274l-8.362-8.34 8.365-8.387A.9.9 0 0 0 14.263.264l-9 9.024a.902.902 0 0 0 .002 1.273l9 8.976z"
                        fill="#1e1d29" fill-rule="evenodd"></path>
                </svg>
                <h1 class="paymentList"><strong>주문상세</strong></h1>
            </router-link>

            <div class="order wrap">
                <div class="order-date"><strong>{{ details.orderCreatedAt }}</strong></div>
                <div class="orderNUM">주문번호 {{ details.orderIdx }}</div>
            </div>


            <div class="product-status">
                <div class="pay-status">
                    <strong>{{ details.orderStatus }}</strong>
                </div>


                <hr>
                <div class="product wrap">
                    <img :src="details.bookImg" alt="">

                    <div class="product-details">
                        <div class="product-details name">{{ details.title }}</div>
                        <div class="product-details price">{{ details.amount }}</div>
                    </div>
                </div>


            </div>

            <hr class="product-line">

            <div class="product-pay-details">
                <h2>
                    <Strong>결제정보</Strong>
                </h2>

                <div class="details-content">
                    <div class="content-status">

                        <div class="details-content-pay wrap">
                            <strong>결제금액</strong>
                            <strong class="money">{{ details.amount }} 원</strong>
                        </div>
                    </div>


                </div>
                <router-link :to="`/review/${details.orderIdx}`" v-if="details.reviewIdx === null">
                    <button id="add-review"
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true">
                        후기 작성하기
                    </button>
                </router-link>
                <router-link :to="`/review/${details.reviewIdx}`" v-else>
                    <button id="add-review"
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true">
                        후기 작성하기
                    </button>
                </router-link>

            </div>

        </div>
    </div>

</template>

<style lang="css" scoped>
.body {
    margin: 100px 0px 50px;
    display: flex;
    justify-content: center;
}

.container {
    width: 70vw !important;
}

.title {
    display: flex;
    align-items: center;
}

.wrap {
    display: flex;
}

.order.wrap {
    margin: 15px 7px;
    justify-content: center;
}

.orderNUM {
    margin-left: auto;
    color: rgb(102, 102, 102);
    font-size: 13px;
    font-weight: 500;
}

.product-status {
    border: 1px solid rgb(229, 229, 229);
    border-radius: 5px;

}

.pay-status {

    margin: 10px 16px;
}

.product-status hr {
    width: 93%;
    margin: 0 auto;
    border: 0;
    border-top: 2px solid #e5e7eb;

}

.product.wrap {
    margin: 12px 16px;
    align-items: center;
}

.product.wrap img {
    width: 65px;
    height: 65px;
    border-radius: 5px;
}

.product-details {
    margin-left: 10px;
}

.product-details.name {
    font-weight: 500;
    line-height: 120%;
    color: rgb(76, 76, 76);
    margin-bottom: 7px;
}

.product-details.price {
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    color: rgb(25, 25, 25);
}

.product-line {
    width: 93%;
    border: 0;
    border-top: 4px solid #e5e7eb;
    margin: 40px auto;
}

.product-pay-guide {
    color: rgb(0, 165, 135);
    padding: 16px 20px;
    background-color: rgb(237, 249, 247);
    font-size: 13px;
    line-height: 140%;
}

.product-pay-details h2 {
    margin-bottom: 10px;
}

.details-content {
    border: 1px solid rgb(229, 229, 229);
}

.details-content-order.wrap div {
    color: rgb(140, 140, 140);
}

.details-content-pay.wrap {
    margin-top: 13px;
}

.money {
    margin-left: auto;
}

.content-status {
    padding: 25px 16px;
}

#add-review {
    width: 70vw;
    display: block;
    margin: 25px auto
}
</style>