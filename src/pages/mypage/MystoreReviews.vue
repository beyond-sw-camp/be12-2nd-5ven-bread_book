<template>
    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <a>
            <button class="w-full h-56 bg-cover rounded-md" :style="{ backgroundImage: `url('${ review.image_url }')` }">
                <span class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4">자세히 보기 후기</span>
            </button>
        </a>

        <div class="px-5 py-3">
            <h3 class="text-gray-700 uppercase">{{ review.name }}</h3>
            <span class="text-gray-500 mt-2">$ {{ review.price }}</span>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'MystoreReivews',
    props: {
        review: Object,
    },
};
</script>

<style scoped></style>