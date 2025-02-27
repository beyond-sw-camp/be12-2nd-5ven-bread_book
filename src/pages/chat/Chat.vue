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
const stompClient = ref(null);

onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchChatRooms();
  console.log("채팅방 목록 불러오기 완료:", chatRoomStore.chatRooms);
  setSelectedChatRoom(parseInt(route.params.id, 10));
  loadingStore.stopLoading();
});

// 라우트 변경 감지
watch(
  () => route.params.id,
  (newId) => {
    console.log("라우트 변경 감지:", newId); 
    if (newId) {
      setSelectedChatRoom(parseInt(newId, 10));
    }
  },
  { immediate: true }
);

function setSelectedChatRoom(roomIdx) {
  console.log("채팅방 선택 시도:", roomIdx);

  // 기존 WebSocket 연결 해제
  if (stompClient.value) {
    console.log("기존 WebSocket 연결 해제");
    stompClient.value.deactivate();
    stompClient.value = null; 
  }

  // selectedChatRoom 초기화 후 강제 업데이트
  selectedChatRoom.value = null;
  setTimeout(() => {
    selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.roomIdx === roomIdx);

    if (!selectedChatRoom.value) {
      console.warn("선택된 채팅방을 찾을 수 없습니다. 다시 불러옵니다.");
      chatRoomStore.fetchChatRooms().then(() => {
        selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.roomIdx === roomIdx);
        if (selectedChatRoom.value) {
          connectWebSocket(roomIdx);
        }
      });
      return;
    }

    console.log("선택된 채팅방:", selectedChatRoom.value);
    setTimeout(() => {
      connectWebSocket(roomIdx); // WebSocket 연결
    }, 50); // 약간의 딜레이 추가
  }, 10);
}


function connectWebSocket(roomIdx) {
  stompClient.value = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("WebSocket 연결 성공: 채팅방", roomIdx);
      stompClient.value.subscribe(`/topic/room/${roomIdx}`, (message) => {
        console.log("새 메시지 수신:", JSON.parse(message.body));
      });
    },
    onDisconnect: () => {
      console.log("WebSocket 연결 해제됨");
    },
  });
  stompClient.value.activate();
}

function selectChatRoom(roomId) {
  console.log("채팅방 클릭됨:", roomId);

  if (selectedChatRoom.value?.roomIdx === roomId) {
    console.log("현재 채팅방과 동일 - URL 강제 업데이트");

    // 강제 URL 변경 (Vue Router가 같은 URL을 무시하는 문제 해결)
    router.replace(`/dummy`).then(() => {
      setTimeout(() => {
        router.replace(`/chat/${roomId}`).catch((err) => console.warn(" 라우터 이동 오류:", err));
      }, 50);
    });

    return;
  }

  selectedChatRoom.value = null; // 기존 채팅방 초기화하여 반응형 강제 업데이트

  setTimeout(() => {
    selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.roomIdx === roomId);
    console.log("선택된 채팅방 업데이트 완료:", selectedChatRoom.value);

    router.replace(`/dummy`).then(() => {
      setTimeout(() => {
        router.replace(`/chat/${roomId}`).catch((err) => console.warn(" 라우터 이동 오류:", err));
      }, 50);
    });
  }, 10);
}

</script>

<template>
  <div class="flex h-screen overflow-hidden mt-16">
    <ChatSidebar :chatRooms="chatRoomStore.chatRooms" :selectChatRoom="selectChatRoom" />
    <div v-if="!selectedChatRoom" class="flex-1 flex flex-col items-center justify-center p-4">
      <img src="../../assets/icon/talkimage.png" alt="" class="mb-4 w-24 h-24" />
      <h1 class="text-2xl font-bold text-center">채팅방을 선택해주세요</h1>
    </div>
  </div>
</template>

<style scoped></style>


