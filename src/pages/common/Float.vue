<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 버튼의 위치 상태를 관리
const buttonPosition = ref(16); // 초기 위치 (px)
let scrollTimeout = null;

function handleScroll() {
  if (scrollTimeout) return; // 스로틀링

  scrollTimeout = setTimeout(() => {
    const scrollY = window.scrollY; // 현재 스크롤 위치
    buttonPosition.value = 16 + scrollY; // 버튼 위치 업데이트
    scrollTimeout = null; // 타이머 초기화
  }, 100); // 100ms 간격
}

function handleClick() {
  alert('플로팅 버튼 클릭!');
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <!-- 플로팅 버튼 -->

    <button
        class="fixed bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition"
        :style="{ bottom: `${buttonPosition}px`, right: '16px' }"
        @click="handleClick"
    >
      +
    </button>

    <!-- 긴 내용 추가 -->
    <div class="h-[2000px]">
      스크롤 테스트를 위한 긴 페이지 내용
    </div>
  </div>
</template>

<style scoped>

</style>