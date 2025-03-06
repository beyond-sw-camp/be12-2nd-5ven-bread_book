<template>
  <div class="w-1/4 bg-white border-r border-gray-300 sm:w-1/3 md:w-1/4 lg:block hidden">
    <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
      <h1 class="text-2xl font-semibold">채팅 목록</h1>
    </header>
    <div class="overflow-y-auto h-full p-3 pb-20 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <ChatRoomListItem
        v-for="room in chatRoomsRef"
        :key="room.roomIdx"
        :room="room"
        :class="{ 'bg-gray-200': selectedRoomIdx === room.roomIdx }"
        @click="() => changeChatRoom(room.roomIdx)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import ChatRoomListItem from "./ChatRoomListItem.vue";
import { Client } from "@stomp/stompjs";

const props = defineProps({
  chatRooms: {
    type: Array,
    required: true,
  },
  selectChatRoom: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();

const chatRoomsRef = ref([...props.chatRooms]);
const selectedRoomIdx = ref(route.params.roomIdx ? Number(route.params.roomIdx) : null);
let stompClient = null;

onMounted(() => {
  connectWebSocket();
});

// URL 변경 감지하여 선택된 채팅방 업데이트
watch(
  () => route.params.roomIdx,
  (newRoomIdx) => {
    selectedRoomIdx.value = newRoomIdx ? Number(newRoomIdx) : null;
  }
);

// chatRooms가 변경될 때마다 새로운 채팅방을 반영
watch(
  () => props.chatRooms,
  (newChatRooms) => {
    console.log("채팅방 목록 업데이트됨:", newChatRooms);
    chatRoomsRef.value = newChatRooms;
  },
  { deep: true }
);

function changeChatRoom(roomIdx) {
  console.log(`채팅방 변경: ${roomIdx}`);
  selectedRoomIdx.value = roomIdx;
  router.push(`/chat/${roomIdx}`);
}

// WebSocket 연결 함수
function connectWebSocket() {
  if (stompClient) {
    console.log("기존 WebSocket 연결 해제 후 재연결...");
    stompClient.deactivate();
    stompClient = null;
  }

  stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("ebSocket 연결됨");
      chatRoomsRef.value.forEach((room) => {
        console.log(`채팅방 구독: /topic/room/${room.roomIdx}`);
        stompClient.subscribe(`/topic/room/${room.roomIdx}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("새 메시지 수신:", receivedMessage);
          const chatRoom = chatRoomsRef.value.find((r) => r.roomIdx === receivedMessage.roomIdx);
          if (chatRoom) {
            chatRoom.lastChat = receivedMessage.message;
          }
        });
      });
    },
    onDisconnect: () => {
      console.log("WebSocket 연결 해제됨");
    },
  });

  stompClient.activate();
}

// WebSocket 연결 해제 (컴포넌트 제거 시)
onBeforeUnmount(() => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
});
</script>

<style scoped></style>
