<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';


const router = useRouter();
const user = ref({});

const memberStore = useMemberStore();
const signup = async () => {
    const response = await memberStore.signupOauth(user.value);
    if(response.status == 200)
        router.push('/signup_success');
}
</script>

<template>
    <div class="bg-gray-300 w-full min-h-screen flex items-center justify-center">
    <!-- <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300"> -->
        <div class="w-full py-8">
        <!-- <div class="w-full">     -->
            <div class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
            <!-- <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"> -->
                <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">회원가입</h2>
                <p class="text-center text-sm text-gray-600 mt-2">이미 계정이 있으신가요? <router-link to="/login" class="text-blue-600 hover:text-blue-700 hover:underline" title="Sign In">로그인</router-link></p>

                <form action="/" @submit.prevent="signup" class="my-8 text-sm">
                    <div class="flex flex-col my-4">
                        <label for="name" class="text-gray-700">이름</label>
                        <input type="text" name="name" id="name" v-model="user.name" class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="이름 입력">
                    </div>

                    <div class="flex flex-col my-4">
                        <label for="nickname" class="text-gray-700">닉네임</label>
                        <input type="text" name="nickname" id="nickname" v-model="user.nickname" class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="닉네임 입력">
                    </div>

                    <div class="flex flex-col my-4">
                        <label for="email" class="text-gray-700">이메일</label>
                        <input type="email" name="email" v-model="user.email" id="email" class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="이메일 입력">
                    </div>

                    <div class="flex flex-col my-4">
                        <label for="birthdate" class="text-gray-700">성별</label>
                        <p><input type="radio" name="gender" value="male" v-model="user.gender"> 남성</p>
                        <p><input type="radio" name="gender" value="female" v-model="user.gender"> 여성 </p>
                        <p><input type="radio" name="gender" value="other" v-model="user.gender"> 기타 </p>
                    </div>

                    <div class="flex flex-col my-4">
                        <label for="birthdate" class="text-gray-700">생년월일</label>
                        <input type="date" name="birthdate" id="birthdate" v-model="user.birthDate" class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded " placeholder="닉네임 입력">
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" name="remember_me" id="remember_me" class="mr-2 focus:ring-0 rounded">
                        <label for="remember_me" class="text-gray-700">회원가입을 진행하여<router-link to="/terms" class="text-blue-600 hover:text-blue-700 hover:underline"> 이용약관</router-link>에 동의합니다. </label>
                    </div>
                
                    <div class="my-4 flex items-center justify-end space-x-4">
                        <button class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>