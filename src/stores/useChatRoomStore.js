import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "../stores/useLoadingStore";

export const useChatRoomStore = defineStore("chatRoom", {
  state: () => ({
    chatRooms: [],
    messages: {},
  }),

  actions: {
    //채팅방 목록 불러오기 (REST API)
    async fetchChatRooms() {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();
      try {
        console.log("채팅방 목록 요청 시작!");
        const response = await axios.get("/api/chatting/rooms");
        console.log("API 응답 데이터:", response.data); // 응답 확인
        this.chatRooms = response.data.data;
        console.log("저장된 채팅방 목록:", this.chatRooms);
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      } finally {
        loadingStore.stopLoading();
      }
    },

    // 특정 채팅방의 메시지 불러오기 (REST API)
    async fetchChatRoomMessages(roomIdx) {
      try {
        const response = await axios.get(`/api/chatting/room/${roomIdx}`);
        this.messages[roomIdx] = response.data.data.messages;
        this.chatRooms = this.chatRooms.map(room =>
          room.roomIdx === roomIdx ? { ...room, bookTitle: response.data.data.bookTitle } : room
        );
      } catch (error) {
        console.error(`채팅방 ${roomIdx} 메시지 불러오기 실패:`, error);
      }
    }
    ,

    // 메시지 전송 (WebSocket 사용)
    async sendMessage(stompClient, roomIdx, message) {
      if (!message.trim() || !stompClient || !stompClient.connected) return;
      stompClient.publish({
        destination: `/app/chatting/room/${roomIdx}`,
        body: JSON.stringify({ message }),
      });
    },
  },
});