<script setup>
import { ref } from "vue";
import { useMemberStore } from "../../stores/useMemberStore";
import { useRouter } from "vue-router";
import { useLoadingStore } from "../../stores/useLoadingStore";

const memberStore = useMemberStore();
const router = useRouter();
const loadginStore = useLoadingStore();

const id = ref('');
const pw = ref('');

const templogin = "ID : test01\nPW : qwer1234"

const login = async () => {
    console.log("loginClicked");
    loadginStore.startLoading();
    const response = await memberStore.login({ id: id.value, pw: pw.value });
    loadginStore.stopLoading();
    console.log(response);
    if (response.status != 200) {
        alert("계정이 존재하지 않거나 비밀번호가 틀렸습니다.")
    } else {
        router.go(-1);
    }
}
const socialLogin = async (provider) => {
    window.location.href = "http://localhost:5173/api/oauth2/authorization/" + provider;
    // const response = await memberStore.socialLogin(provider);
    console.log(response);
}

</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">로그인</div>
            <button @click="socialLogin('naver')"
                class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
                    <img src="/src/assets/icon/naverBtn.png" width="30" height="30" alt="Naver logo icon">
                </span>
                <span>네이버로 로그인</span>
            </button>
            <button @click="socialLogin('kakao')"
                class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
                    <img src="/src/assets/icon/kakaotalkBtn.png" width="20" height="20" alt="Kakao logo icon">
                </span>
                <span>카카오로 로그인</span>
            </button>
            <button @click="socialLogin('google')"
                class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-black-500"><i
                        class="fab fa-google"></i></span>
                <span>구글로 로그인</span>
            </button>
            <div class="relative mt-10 h-px bg-gray-300">
                <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span class="bg-white px-4 text-xs text-gray-500 uppercase">id로 로그인</span>
                </div>
            </div>
            <div class="mt-10">
                <form action="/" @submit.prevent="login">
                    <div class="flex flex-col mb-6">
                        <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Id:</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>

                            <input id="Id" name="Id" v-model="id"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Id" />
                        </div>
                    </div>
                    <div class="flex flex-col mb-6">
                        <label for="password"
                            class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                            </div>

                            <input id="password" type="password" name="password" v-model="pw"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div class="flex items-center mb-6 -mt-4">
                        <div class="flex ml-auto">
                            <router-link to="/find_id_pw"
                                class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">비밀번호를
                                잊으셨나요?</router-link>
                        </div>
                    </div>

                    <div class="flex w-full">
                        <button
                            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                            <span class="mr-2 uppercase">로그인</span>
                            <span>
                                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="flex justify-center items-center mt-6">
                <router-link to="/signup"
                    class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                    <span>
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </span>
                    <span class="ml-2">회원가입</span>
                </router-link>
            </div>
        </div>
        <div class="fixed bottom-4 right-4 bg-yellow-200 p-3 rounded-lg shadow-md w-48">
            <h3 class="text-xs font-bold text-gray-700 mb-1">📌 임시 로그인</h3>
            <textarea v-model="templogin" readonly class="w-full h-20 text-xs p-1 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400"></textarea>
            <!-- <div>ID : test01 <br> PW : qwer1234</div> -->
        </div>
    </div>
</template>

<style scoped></style>