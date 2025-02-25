<template>
  <div
    class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    @click="handleClick"
  >
    <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <img :src="room.avatar" :alt="room.title" class="w-12 h-12 rounded-full" />
    </div>
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ room.title }}</h2>
      <p class="text-gray-600">{{ lastChat || "메시지가 없습니다." }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select"]);

// ✅ 반응형 데이터로 lastChat을 관리
const lastChat = ref(props.room.lastChat || "메시지가 없습니다.");

// ✅ 새로운 메시지가 오면 lastChat 업데이트
watch(
  () => props.room.messages,
  (newMessages) => {
    if (newMessages && newMessages.length > 0) {
      lastChat.value = newMessages[newMessages.length - 1].content;
    }
  },
  { deep: true }
);

// ✅ 채팅방 선택 이벤트
function handleClick() {
  emit("select", props.room);
}
</script>

<style scoped>
</style>

