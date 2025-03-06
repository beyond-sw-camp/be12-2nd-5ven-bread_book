<template>
  <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" @click="handleClick">
    <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <img :src="bookImageUrl" :alt="room.title" class="w-12 h-12 rounded-full" />
    </div>
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ room.title }}</h2>
      <p class="text-gray-600">{{ lastMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select"]);

// 기본 이미지 URL 설정 (room.avatar 없을 경우 대체 이미지 사용)
const bookImageUrl = computed(() =>
  props.room.productImageUrl ||
  "https://via.placeholder.com/48?text=No+Image"
);

// 마지막 채팅 메시지 가져오기
const lastMessage = computed(() => {
  return props.room.messages?.length
    ? props.room.messages[props.room.messages.length - 1].message
    : "메시지가 없습니다.";
});

// 채팅방 선택 이벤트
function handleClick() {
  emit("select", props.room);
}
</script>

<style scoped></style>
