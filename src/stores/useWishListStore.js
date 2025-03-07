import { defineStore } from "pinia";
import WishList from "../pages/common/WishList.vue";
import axios from "axios";


export const useWishListStore = defineStore(
  'wishList', {
    state:() => ({
      wishLists: [],
      toggle: {},
    }),

    actions: {
      // 찜하기 버튼 누를때
      async register(product, useridx) {
        const response = await axios.post("/api/wishlist/register",
          {
            // 넣어야하는 필수 항목들 넣기
          }
        );
        return response;
      },

      // 찜 삭제
      async delete(product, useridx) {
        const response = await axios.post("/api/wishlist/delete",
          {
            // 필요에따라 넣기
          }
        );
        return response;
      },

      // 리스트 출력
      async wishList() {
        try {
          const response = await axios.get(`/api/wish/list`);
          this.wishLists = response.data;
        } catch(error) {
          console.error("데이터를 가져오는중에 에러 발생 : ", error);
        }
      },

      // 뭔지모르지만 백에 있길래 추가
      async toggle(productIdx) {
        try {
          const response = await axios.get(`/api/toggle/${productIdx}`);
          this.toggle = response.data;
        } catch(error) {
          console.error("데이터를불러오는ㄴ중 에러 발생 : ", error);
        }
      }
    }
  }
)