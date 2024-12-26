import { defineStore } from 'pinia';
import axios from 'axios';

export const useChatRoomStore = defineStore('chatRoom', {
    state: () => ({chatRooms: []}),
    actions: {
        async fetchchatRooms() {
            const response = await axios.get("https://72fe67fb-06cb-478f-b472-e8cfc2559991.mock.pstmn.io/api/chatting");
            this.chatRooms = response.data;
        },
    },
    getters: {
        allMessages: (state) =>
          state.chatRooms.flatMap((room) => room.messages || []),
      },
})