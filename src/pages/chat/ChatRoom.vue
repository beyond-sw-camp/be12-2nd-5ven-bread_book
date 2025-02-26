<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useChatRoomStore } from "../../stores/useChatRoomStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import ChatSidebar from "./ChatSidebar.vue";
import { Client } from "@stomp/stompjs";

const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);
const newMessage = ref("");
const stompClient = ref(null);
let subscription = null;

onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchChatRooms();
  setSelectedChatRoom(parseInt(route.params.id, 10));
  loadingStore.stopLoading();
});

onBeforeUnmount(() => {
  if (stompClient.value) {
    console.log("웹소켓 연결 해제");
    stompClient.value.deactivate();
  }
});

watch(() => route.params.id, async (newId, oldId) => {
  console.log("📌 URI 변경 감지:", newId);
  
  if (!newId || (oldId && newId === oldId)) {
    return;
  }

  selectedChatRoom.value = null;
  await chatRoomStore.fetchChatRooms();

  setTimeout(() => {
    selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.roomIdx === parseInt(newId, 10));
    if (selectedChatRoom.value) {
      router.push(`/chat/${newId}`); // ✅ URL 업데이트 추가
      connectWebSocket(selectedChatRoom.value.roomIdx);
    }
  }, 10);
}, { immediate: true });






function setSelectedChatRoom(roomId) {
  console.log(`채팅방 변경: ${roomId}`);
  
  if (!roomId || isNaN(roomId)) {
    console.error("🚨 잘못된 채팅방 ID:", roomId);
    return;
  }

  if (selectedChatRoom.value?.roomIdx === roomId) {
    console.log("같은 채팅방 클릭 - 변경하지 않음");
    return;
  }

  selectedChatRoom.value = null; // 기존 채팅방 초기화
  setTimeout(() => {
    selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.roomIdx === roomId);
    if (selectedChatRoom.value) {
      connectWebSocket(roomId);
    }
  }, 10);
}



function connectWebSocket(roomId) {
  if (stompClient.value) {
    console.log("🔌 기존 WebSocket 연결 해제 중...");
    stompClient.value.deactivate(() => {
      console.log("✅ WebSocket 해제 완료");
      stompClient.value = null;

      // 🚀 새로운 WebSocket 연결을 안전하게 수행
      setTimeout(() => {
        initializeWebSocket(roomId);
      }, 100);
    });
  } else {
    initializeWebSocket(roomId);
  }
}

function initializeWebSocket(roomId) {
  stompClient.value = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,
    onConnect: () => {
      console.log(`✅ WebSocket 연결됨: 채팅방 ${roomId}`);

      if (subscription) {
        subscription.unsubscribe();
      }

      subscription = stompClient.value.subscribe(`/topic/room/${roomId}`, (message) => {
        console.log("📩 새 메시지 수신:", message.body);
        const receivedMessage = JSON.parse(message.body);
        if (selectedChatRoom.value) {
          selectedChatRoom.value.messages.push(receivedMessage);
        }
      });
    },
    onDisconnect: () => {
      console.log("❌ WebSocket 연결 종료됨");
    },
  });

  stompClient.value.activate();
}


function sendMessage() {
  if (!newMessage.value.trim() || !selectedChatRoom.value || !stompClient.value.active) {
    console.error("메시지를 전송할 수 없습니다. STOMP가 활성화되지 않았습니다.");
    return;
  }
  
  const messagePayload = {
    roomIdx: selectedChatRoom.value.roomIdx,
    sendUserIdx: 1, // 예제: 현재 로그인된 사용자 ID
    message: newMessage.value,
  };

  console.log("메시지 전송:", messagePayload);

  stompClient.value.publish({
    destination: `/app/chat/${selectedChatRoom.value.roomIdx}`,
    body: JSON.stringify(messagePayload),
  });

  // UI에 즉시 반영 (새로고침 없이 보이도록)
  selectedChatRoom.value.messages = [
    ...selectedChatRoom.value.messages,
    messagePayload
  ];
  
  newMessage.value = "";
}

function showPaymentModal() {
  isPaymentModalVisible.value = true;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden mt-16">
    <ChatSidebar :chatRooms="chatRoomStore.chatRooms" :selectChatRoom="setSelectedChatRoom" />
    <div class="flex-1 flex flex-col">
      <header v-if="selectedChatRoom" class="p-4 border-b bg-gray-100 flex items-center justify-between">
        <h1 class="text-xl font-semibold">{{ selectedChatRoom.title }}</h1>
        <button @click="showPaymentModal" class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4">예약하기</button>
      </header>
      <div v-if="selectedChatRoom" class="flex-1 p-4 overflow-y-auto">
        <div v-for="(message, index) in selectedChatRoom.messages" :key="index" class="mb-4">
          <div v-if="message.sendUserIdx === 1" class="text-right">
            <span class="bg-blue-500 text-white p-2 rounded-lg">{{ message.message }}</span>
          </div>
          <div v-else class="text-left">
            <span class="bg-gray-300 p-2 rounded-lg">{{ message.message }}</span>
          </div>
        </div>
      </div>
      <footer v-if="selectedChatRoom" class="p-4 border-t bg-gray-100">
        <div class="flex items-center">
          <input v-model="newMessage" type="text" placeholder="메시지를 입력하세요..." class="flex-1 p-2 border rounded-md" @keyup.enter="sendMessage" />
          <button @click="sendMessage" class="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md">전송</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
</style>
