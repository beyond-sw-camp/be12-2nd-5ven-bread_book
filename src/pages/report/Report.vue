<script setup>

</script>

<template>
  <div class="bg-gray-300 w-full min-h-screen flex items-center justify-center">
    <div class="w-full py-8">
      <div
        class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl"
      >

        <h1 class="text-center text-2xl font-bold tracking-wide text-gray-800">
          신고 하기
        </h1>

        <form action="/" @submit.prevent="signup" class="my-8 text-sm">
          <h3>신고 게시글 : 홍길동님의 자전거 <!-- {{ username }}의 {{  }}--></h3>
          <div  class="flex flex-col my-4">
            <label for="nickname" class="text-gray-700">신고내용 작성</label>
            <textarea ref="textArea" style="width: 500px; height: 100px outline-none; border: 1px solid #ccc; 
            font-size: 14px; padding: 6px;" v-model="textAreaValue "></textarea>
          </div>

        

          <div class="flex flex-col my-4">
            <label for="password" class="text-gray-700">비밀번호</label>
            <div
              x-data="{ show: false }"
              class="relative flex items-center mt-2"
            >
              <input
                :type="show ? 'text' : 'password'"
    
                name="password"
                id="password"
                class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="비밀번호 입력"
              />
                              <!-- type="password" -->
              <button
                @click="toggleShow"
                type="button"
                class="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
              >
                <svg
                  v-if="!show"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>

                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="my-4 flex items-center justify-end space-x-4">
            <button
              class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
            >
              신고하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>