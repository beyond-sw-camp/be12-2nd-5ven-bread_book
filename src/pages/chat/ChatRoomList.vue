<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router"; // 라우터 import
import { useChatRoomStore } from "../../stores/useChatRoomStore"; // Store import
import { useLoadingStore } from "../../stores/useLoadingStore";

const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);
const isPaymentModalVisible = ref(false); // 모달 상태 관리

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchchatRooms(); // 채팅방 데이터 로드
  const roomId = parseInt(route.params.id, 10); // URL에서 id 가져오기
  selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.id === roomId);
  loadingStore.stopLoading();
});

// 채팅방 선택 핸들러
function selectChatRoom(room) {
  selectedChatRoom.value = room;
  router.push(`/chat/${room.id}`); // URL 변경
}

// 모달 열기/닫기 핸들러
function showPaymentModal() {
  isPaymentModalVisible.value = true;
}

function hidePaymentModal() {
  isPaymentModalVisible.value = false;
}

</script>

<template>
  <div class="flex h-screen overflow-hidden pt-20">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r border-gray-300 sm:w-1/3 md:w-1/4 lg:block hidden">
      <!-- Sidebar Header -->
      <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 class="text-2xl font-semibold">채팅 목록</h1>
      </header>

      <!-- Contact List -->
      <div class="overflow-y-auto h-screen p-3 mb-9 pb-20 h-full overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <!-- Dynamic Chat Room List -->
        <div
          v-for="room in chatRoomStore.chatRooms"
          :key="room.id"
          class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          @click="selectChatRoom(room)"
        >
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img
              :src="room.avatar"
              :alt="room.title"
              class="w-12 h-12 rounded-full"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold">{{ room.title }}</h2>
            <p class="text-gray-600">{{ room.messages[0]?.content || "메시지가 없습니다." }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1">
      <!-- Chat Header -->
      <header v-if="selectedChatRoom" class="flex bg-white p-4 text-gray-700 border-b border-gray-300 shadow-md">
        <h1 class="text-2xl font-semibold">{{ selectedChatRoom.title }}</h1>
      
      <button @click="showPaymentModal"
          class="group relative ml-4 h-10 w-32 overflow-hidden rounded-2xl bg-indigo-500 text-lg font-bold text-white">
          결제하기
          <div
            class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30">
          </div>
        </button>
      </header>
      <!-- Chat Messages -->
      <div v-if="selectedChatRoom" class="h-screen overflow-y-auto p-4 pb-36 h-full overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <div v-for="(message, index) in selectedChatRoom.messages" :key="index" class="mb-4">
          <!-- User Messages -->
          <div v-if="message.sender === 'user'" class="flex mb-4">
            <div class="w-9 h-9 rounded-full mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=User"
                alt="User Avatar"
                class="w-8 h-8 rounded-full"
              />
            </div>
            <div class="max-w-md bg-indigo-200 rounded-lg p-3">
              <p class="text-gray-700">{{ message.content }}</p>
            </div>
          </div>

          <!-- Seller Messages -->
          <div v-else class="flex justify-end mb-4">
            <div class="max-w-md bg-indigo-500 text-white rounded-lg p-3">
              <p>{{ message.content }}</p>
            </div>
            <div class="w-9 h-9 rounded-full ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=Seller"
                alt="Seller Avatar"
                class="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <footer v-if="selectedChatRoom" class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 whitespace-nowrap">
            전송
          </button>
        </div>
      </footer>
    </div>
  </div>

<!-- Payment Modal -->
<div
    :class="isPaymentModalVisible ? 'block' : 'hidden'"
    class="py-12 bg-gray-700 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 pt-32"
    id="paymentModal"
  >
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
      <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div class="w-full flex justify-start text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
          </svg>
        </div>
        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">결제 상세</h1>
        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">사용자 이름</label>
        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="홍길동" />
        <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">카드 번호</label>
        <div class="relative mb-5 mt-2">
          <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24V24H0z" />
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="7" y1="15" x2="7.01" y2="15" />
              <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
          </div>
          <input id="email2" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border" placeholder="XXXX - XXXX - XXXX - XXXX" />
        </div>
        <div class="flex items-center justify-start w-full mt-5">
          <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">결제</button>
          <button @click="hidePaymentModal" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">취소</button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>
