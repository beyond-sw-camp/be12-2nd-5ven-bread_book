<script setup>
import { onMounted, ref, computed } from 'vue';
import { usePaymentStore } from '../../stores/paymentStore';
import { useRoute, useRouter } from 'vue-router';
const score = ref(0);
const checkScore = ref(0);
const checkFlag = ref(false);
const reviewText = ref('');
const checkStar = (index) => {
    checkFlag.value = true;
    checkScore.value = index;
}
const hoverStar = (index) => {
    score.value = index;
}
const outStar = (index) => {
    score.value = 0;
}

const los = computed(() => {
    return reviewText.value.length;
})
const paymentStore = usePaymentStore();
const route = useRoute();
const router = useRouter();
const product = ref({});
onMounted(async () => {
    const res = await paymentStore.order(route.params.id);
    product.value = res;
})
const goBack = () => {
    router.go(-1);
}
</script>

<template>

    <!-- Scrollable Content Wrapper -->
    <main class="flex-grow pt-[72px] pb-[72px] w-full max-w-[894px] mx-auto overflow-y-auto px-4">
        <!-- Grouped White Container -->
        <div class="bg-white rounded-lg shadow-md p-4">
            <!-- Tabs -->
            <div class="border-b">
                <a href="#" class="flex justify-between items-center w-full py-3 text-sm text-gray-700">
                    작성시 유의사항
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </a>
            </div>

            <!-- Product Info -->
            <div class="mt-4">
                <h2 class="text-sm font-bold mb-4">이 상품 어떠셨나요?</h2>
                <div class="flex items-start gap-4">
                    <img :src="product.book_image" alt="Product Image" class="w-20 h-20 object-contain border">
                    <div>
                        <p class="text-sm font-semibold">{{ product.title }}</p>
                        <p class="text-sm text-gray-500">{{ product.username }}</p>
                        <p class="text-sm text-gray-500">{{ product.amount }}원</p>
                    </div>
                </div>
                <div class="mt-4 flex gap-1">
                    <div class="star" v-for="index in 5" :key="index" @click="checkStar(index)" @mouseover="hoverStar(index)" @mouseleave="outStar()">
                        <i v-if="index<=score && index>checkScore" class="fas fa-star text-gray-300 text-xl"></i>
                        <i v-else-if="index<=checkScore" class="fas fa-star text-black-300 text-xl"></i>
                        <i v-else class="far fa-star text-gray-300 text-xl"></i>
                    </div>
                </div>
            </div>

            <!-- Review Text -->
            <div class="mt-4">
                <h2 class="text-sm font-bold mb-2">어떤 점이 좋았나요?</h2>
                <textarea v-model="reviewText" class="w-full h-28 border border-gray-300 rounded-lg p-3 text-sm text-gray-500"
                    placeholder="다른 회원들이 도움받을 수 있도록 상품에 대한 의견을 자세히 공유해주세요."></textarea>
                <div class="flex justify-between text-sm mt-1">
                    <span class="text-gray-400">20자 이상</span>
                    <span class="text-gray-400">{{ los }}/500</span>
                </div>
            </div>

            <!-- Photo Attachment -->
            <!-- <div class="mt-4"> -->
                <!-- <h2 class="text-sm font-bold mb-2">사진 첨부</h2> -->
                <!-- <div class="grid grid-cols-5 gap-4" id="image-preview-container"> -->
                    <!-- First Image Upload Box -->
                    <!-- <label for="image-upload" -->
                        <!-- class="border border-gray-300 rounded-lg flex flex-col items-center justify-center w-16 h-16 text-gray-400 cursor-pointer"> -->
                        <!-- <i class="fas fa-plus"></i> -->
                    <!-- </label> -->
                    <!-- <input type="file" id="image-upload" accept="image/*" multiple onchange="previewImages(event)"> -->
                    <!-- <input type="file" src=""> -->
                <!-- </div> -->
            <!-- </div> -->
        </div>

        <!-- Agreement Section -->
        <div class="bg-white p-4 mt-4 shadow-sm">
            <div class="flex items-start gap-2">
                <input type="checkbox" id="agree" class="w-4 h-4">
                <label for="agree" class="text-sm text-gray-500">
                    전체 동의하기 <br>
                    작성된 후기는 무상 제공 콘텐츠로 사용될 수 있습니다. (필수)
                </label>
            </div>
        </div>
        <div class="relative">
            <button class="bg-black text-white text-sm font-bold py-3 px-8 rounded-lg absolute right-0">등록하기</button>
        </div>
    </main>

</template>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}

input[type="file"] {
    display: none;
}
</style>