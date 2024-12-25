<script setup>
import { ref, onMounted } from "vue";
import { useChatRoomStore } from "../../stores/useChatRoomStore"; // Store import
import { useRouter, useRoute } from "vue-router"; // 라우터 import

const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  await chatRoomStore.fetchchatRooms(); // 채팅방 데이터 로드
  const roomId = parseInt(route.params.id, 10); // URL에서 id 가져오기
  selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.id === roomId);
});

// 채팅방 선택 핸들러
function selectChatRoom(room) {
  selectedChatRoom.value = room;
  router.push(`/chat/${room.id}`); // URL 변경
}
</script>

<template>
  <div class="flex h-screen overflow-hidden pt-12">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r border-gray-300 sm:w-1/3 md:w-1/4 lg:block hidden">
      <!-- Sidebar Header -->
      <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 class="text-2xl font-semibold">채팅 목록</h1>
      </header>

      <!-- Contact List -->
      <div class="overflow-y-auto h-screen p-3 mb-9 pb-20">
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
      </header>

      <!-- Chat Messages -->
      <div v-if="selectedChatRoom" class="h-screen overflow-y-auto p-4 pb-36">
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
      <footer v-if="selectedChatRoom" class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
            전송
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
</style>
