<script setup>
import { defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  isVisible: Boolean, // 모달의 상태를 상위 컴포넌트로부터 전달받음
});
const emit = defineEmits(["close"]);
function hideModal() {
  emit("close");
}
</script>

<template>
  <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
  >
    <div class="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
      <!-- 모달 제목 -->
      <div class="flex justify-between items-center border-b pb-2">
        <h3 class="text-xl font-semibold text-gray-800 px-4">로그아웃</h3>
        <button @click="hideModal" class="text-gray-500 hover:text-gray-800">
          ✖
        </button>
      </div>

      <!-- 모달 내용 -->
      <div class="py-4 px-4 text-gray-600">
        로그아웃 하시겠습니까?
      </div>

      <!-- 모달 하단 버튼 -->
      <div class="flex justify-end gap-2">
        <button
            @click="hideModal"
            class="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          취소
        </button>
        <button
            @click="(function () {hideModal();router.go(0);})()"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 모달 배경 */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
