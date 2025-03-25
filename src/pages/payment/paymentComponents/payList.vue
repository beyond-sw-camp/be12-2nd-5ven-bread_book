<script setup>
import { watch, onMounted, ref,onUnmounted } from "vue";
import { usePaymentStore } from "../../../stores/usePaymentStore";
import { useRoute } from "vue-router";
import { useLoadingStore } from "../../../stores/useLoadingStore";

const paymentStore = usePaymentStore();
const option = ref("");
const loadingStore = useLoadingStore();
const route = useRoute();
const page = ref(0); // 현재 페이지
const observer = ref(null); // Intersection Observer 저장
const loadMore = ref(null); // 감시할 요소
const rimit = ref(true);

const fetchData = async () => {
    if (loadingStore.isLoading) return; // 이미 로딩 중이면 중복 호출 방지
    console.log(page.value);
    loadingStore.startLoading();
    const requestData = {
        page: page.value
    };

    rimit.value = await paymentStore.pays(requestData);
    page.value++; // 다음 페이지로 증가
    loadingStore.stopLoading();
};

// 무한 스크롤 감지 로직
const observeElement = () => {
    if (rimit.value === true) {
        observer.value = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {

                    fetchData(); // 요소가 화면에 보이면 데이터 로드
                    window.scrollBy(0, -5);
                }
            },
            { threshold: 1.0 } // 100% 보일 때 실행
        );
    }


    if (loadMore.value) {
        observer.value.observe(loadMore.value);
    }
};

// 감시 해제 (컴포넌트 언마운트 시)
onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
});

// onMounted에서 option 값 설정
onMounted(() => {
    option.value = "전체";  // 올바른 값 할당 방식
    fetchData();
    observeElement();
});

watch(
    () => paymentStore.option,
    (newValue) => {
        option.value = newValue;
    }, { immediate: true }
);

</script>

<template>
    <div style="min-height: 550px;">
        <div v-for="pay in paymentStore.paysList" :key="pay.id">
            <div class="product wrap" v-if="option === '전체' || option === pay.productStatus">
                <div class="product-main">
                    <div class="date wrap">
                        <strong>{{ pay.orderCreatedAt }}</strong>
                        <button style="margin-left: auto;">
                            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                role="img">
                                <path
                                    d="M5.262 19.536a.9.9 0 0 0 1.273 0l9-8.974a.905.905 0 0 0 .265-.636.904.904 0 0 0-.263-.637l-9-9.024a.9.9 0 1 0-1.275 1.27l8.365 8.388-8.363 8.34a.9.9 0 0 0-.002 1.273"
                                    fill="#7f7f7f" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                    <hr>

                    <div id="paymentStatus">{{ pay.productStatus }}</div>

                    <div class="product-details wrap">
                        <router-link :to="`/paymentDetails/${pay.orderIdx}`">
                            <img :src="pay.bookImg" alt="">
                            <div class="product-details-information">
                                <strong>{{ pay.amount }}원</strong>
                                <div class="product-details-name">{{ pay.title }}</div>
                                <div class="product-details-seller">{{ pay.username }}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div ref="loadMore" style="height: 20px;"></div>
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