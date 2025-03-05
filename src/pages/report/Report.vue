<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useReportStore } from '../../stores/useReportStore';


const router = useRouter();
const idx = router.params.idx;

const reprot = ref({});

const reprotStore = useReportStore();

const create = async () => {
  const res = await reprotStore.register(reprot.value, idx);
}
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

        <form action="/" @submit.prevent="create" class="my-8 text-sm">
          <h3>
            신고 게시글 : 홍길동님의 자전거
            <!-- {{ username }}의 {{  }}-->
          </h3>
          <div class="flex flex-col my-4">
            <label for="message" class="text-gray-700">신고내용 작성</label>
            <textarea
              ref="textArea"
              style="
                width: 500px;
                height: 100px outline-none;
                border: 1px solid #ccc;
                font-size: 14px;
                padding: 6px;
              "
              name="message"
              id="message"
              v-model="reportError.message"
            ></textarea>
          </div>

          <!-- <div class="flex items-center">
            <input
              type="checkbox"
              name="remember_me"
              id="remember_me"
              class="mr-2 focus:ring-0 rounded"
            />

            <label for="remember_me" class="text-gray-700"
              >회원가입을 진행하여
              
              <router-link
                to="/terms"
                class="text-blue-600 hover:text-blue-700 hover:underline">
                이용약관
              </router-link>
              에 동의합니다.
            </label>
          </div> -->

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