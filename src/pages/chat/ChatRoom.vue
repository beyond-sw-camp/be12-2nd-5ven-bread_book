<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useChatRoomStore } from "../../stores/useChatRoomStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import { useMemberStore } from "../../stores/useMemberStore";
import ChatSidebar from "./ChatSidebar.vue";
import { Client } from "@stomp/stompjs";

const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const memberStore = useMemberStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);
const newMessage = ref("");
const stompClient = ref(null);
let subscription = null;

const currentUserId = ref(null);

onBeforeUnmount(() => {
  if (stompClient.value) {
    console.log("웹소켓 연결 해제");
    stompClient.value.deactivate();
  }
});


onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchChatRooms();

  // 현재 로그인한 유저 ID 가져오기
  if (!memberStore.member || !memberStore.member.idx) {
    console.error("유저 정보가 아직 설정되지 않음!");
  } else {
    currentUserId.value = memberStore.member.idx;
    console.log("현재 로그인한 유저 ID:", currentUserId.value);
  }
  console.log("멤버 정보:", memberStore.member.profileImgUrl);

  if (route.params.id) {
    selectedChatRoom.value = chatRoomStore.chatRooms.find(room => room.roomIdx === parseInt(route.params.id, 10));
    if (selectedChatRoom.value) {
      console.log("WebSocket 연결 시작");

      selectedChatRoom.value.currentUserId = currentUserId.value;

      connectWebSocket(selectedChatRoom.value.roomIdx);
    }
  }
  loadingStore.stopLoading();
});


function connectWebSocket(roomIdx) {
  if (stompClient.value) {
    stompClient.value.deactivate();
  }

  stompClient.value = new Client({
    brokerURL: "/ws",
    onConnect: () => {
      console.log(`WebSocket 연결됨: 채팅방 ${roomIdx}`);

      if (subscription) {
        subscription.unsubscribe();
      }

      subscription = stompClient.value.subscribe(`/topic/room/${roomIdx}`, (message) => {
        console.log("새 메시지 수신:", message.body); // 디버깅 추가
        try {
          const receivedMessage = JSON.parse(message.body);
          console.log("메시지 데이터 파싱 성공:", receivedMessage);

          if (selectedChatRoom.value) {
            selectedChatRoom.value.messages.push(receivedMessage);
          }
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
        }
      });

    },
  });

  stompClient.value.activate();
}

watch(() => route.params.id, async (newId) => {
  console.log("URI 변경 감지:", newId);
  if (!newId) return;

  selectedChatRoom.value = chatRoomStore.chatRooms.find(room => room.roomIdx === parseInt(newId, 10));
  if (selectedChatRoom.value) {
    console.log("WebSocket 재연결");
    connectWebSocket(selectedChatRoom.value.roomIdx);
  }
});


function setSelectedChatRoom(roomId) {
  console.log(`채팅방 변경: ${roomId}`);

  if (!roomId || isNaN(roomId)) {
    console.error("잘못된 채팅방 ID:", roomId);
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


function sendMessage() {
  if (!newMessage.value.trim() || !selectedChatRoom.value || !stompClient.value.connected) {
    console.error("메시지를 보낼 수 없습니다.");
    return;
  }

  const memberStore = useMemberStore();
  const currentUserId = memberStore.member?.idx; // 로그인한 유저 ID 가져오기

  if (!currentUserId) {
    console.error("유저 ID가 존재하지 않음!");
    return;
  }

  const messagePayload = {
    roomIdx: selectedChatRoom.value.roomIdx,
    sendUserIdx: currentUserId,  // 현재 로그인한 사용자 ID 저장.
    message: newMessage.value,
  };
  console.log("메시지 전송:", messagePayload);

  stompClient.value.publish({
    destination: `/app/chat/${selectedChatRoom.value.roomIdx}`,
    body: JSON.stringify(messagePayload),
  });

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
      <!-- 책 정보 헤더 -->
      <header v-if="selectedChatRoom" class="p-4 border-b bg-gray-100 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- 책 이미지 -->
          <img v-if="selectedChatRoom.productImageUrl" :src="selectedChatRoom.productImageUrl" alt="책 이미지"
            class="w-12 h-12 rounded-md object-cover" />

          <div class="flex space-x-4">
            <!-- 책 제목 -->
            <h1 class="text-lg font-semibold">{{ selectedChatRoom.title }}</h1>
            <!-- 가격 -->
            <span class="text-lg text-gray-600">
              {{ selectedChatRoom.productPrice }}원
            </span>
          </div>
        </div>

        <!-- 거래 예약 버튼 -->
        <button @click="showPaymentModal" class="bg-indigo-500 text-white px-4 py-2 rounded-md">거래 예약</button>
      </header>

      <!-- 채팅 메시지 영역 -->
      <div v-if="selectedChatRoom" class="flex-1 p-4 overflow-y-auto">
        <div v-for="(message, index) in selectedChatRoom.messages" :key="index" class="mb-4 flex items-end"
          :class="{ 'justify-end': message.sendUserIdx === currentUserId }">

          <!-- 상대방 메시지 -->
          <div v-if="message.sendUserIdx !== currentUserId" class="flex items-center space-x-2">
            <div class="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white">
              상대
            </div>
            <span class="bg-gray-300 p-2 rounded-lg">{{ message.message }}</span>
          </div>

          <!-- 본인 메시지 -->
          <div v-else class="flex items-center space-x-2">

            <span class="bg-slate-500 text-white p-2 rounded-lg">{{ message.message }}</span>
            <div class="w-9 h-9 rounded-full bg-yellow-500/80 flex items-center justify-center text-white">
              나
            </div>
          </div>
        </div>
      </div>

      <!-- 메시지 입력 영역 -->
      <footer v-if="selectedChatRoom" class="p-4 border-t bg-gray-100">
        <div class="flex items-center">
          <input v-model="newMessage" type="text" placeholder="메시지를 입력하세요..." class="flex-1 p-2 border rounded-md"
            @keyup.enter="sendMessage" />
          <button @click="sendMessage" class="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md">전송</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
