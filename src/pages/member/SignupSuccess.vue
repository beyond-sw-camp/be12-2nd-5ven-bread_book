<script setup>

</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">회원가입에 성공하셨습니다! 이메일 인증을 진행해주세요!</div>
            <div class="my-4 flex items-center justify-center space-x-4">
                <router-link to="/" class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">확인</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>