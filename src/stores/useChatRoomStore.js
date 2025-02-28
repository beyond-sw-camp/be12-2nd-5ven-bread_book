import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "../stores/useLoadingStore";
import { useMemberStore } from "./useMemberStore";

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
        const memberStore = useMemberStore();
        await memberStore.loginCheck(); // 로그인 체크 후 유저 정보 가져오기

        const currentUserId = memberStore.member?.idx; // 현재 로그인한 유저 ID 가져오기


    if (!currentUserId) {
      console.warn(" 로그인 정보가 없거나 idx가 존재하지 않습니다.");
      return;
    }

        console.log("채팅방 목록 요청 시작! (유저 ID:", currentUserId, ")");

        const response = await axios.get(`/api/chatting/rooms/${currentUserId}`);
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
    async sendMessage(roomIdx, message) {
      if (!stompClient.value || !stompClient.value.connected) {
        console.error("WebSocket이 연결되지 않음!");
        return;
      }

      stompClient.value.publish({
        destination: `/app/chat/${roomIdx}`,
        body: JSON.stringify({ message }),
      });
    },

  },
});