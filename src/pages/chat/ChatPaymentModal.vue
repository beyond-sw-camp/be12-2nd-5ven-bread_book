<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import axios from 'axios';

const { VITE_KEY } = import.meta.env

const openKakaoPayPopup = async () => {
  const kakaopay = {
    ref: null,
  };

  const response = await axios.post(
    "/payapi/online/v1/payment/ready",
    {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: "1",
      total_amount: "2200",
      vat_amount: "200",
      tax_free_amount: "0",
      approval_url: "https://www.breadbook.kro.kr/success",
      fail_url: "https://www.breadbook.kro.kr/fail",
      cancel_url: "https://www.breadbook.kro.kr/cancel"
    },
    {
      headers:{
        Authorization: "SECRET_KEY "+VITE_KEY,
        'Content-Type': "application/json"
      }
    }
  );
  console.log(response);
  // 가정: data.next_redirect_pc_url은 외부에서 받아오는 URL로 설정되어야 합니다.
  const data = {
    next_redirect_pc_url: response.data.next_redirect_pc_url, // 예시 URL, 실제 URL로 대체
  };

  // 팝업 창을 엽니다.
  kakaopay.ref = window.open('', 'paypopup', 'width=426,height=510,toolbar=no');
  console.log(kakaopay.ref)
  if (kakaopay.ref) {
    // 팝업 페이지로 리디렉션
    setTimeout(() => {
      kakaopay.ref.location.href = data.next_redirect_pc_url;
    }, 0);

    // 팝업이 닫혔는지 확인하고, 닫히면 페이지를 리디렉션합니다.
    const checkPopupClosed = setInterval(() => {
      if (kakaopay.ref.closed) {
        clearInterval(checkPopupClosed);
        // 팝업이 닫히면 완료 페이지로 이동
        window.location.href = "https://www.breadbook.kro.kr/chat/";
      }
    }, 1000);
  } else {
    throw new Error("popup을 열 수 없습니다!(cannot open popup)");
  }
};

defineProps({
  isVisible: Boolean, // 모달의 상태를 상위 컴포넌트로부터 전달받음
});

const emit = defineEmits(['close']);

function hideModal() {
  emit('close');
}
</script>

<template>
  <div :class="isVisible ? 'block' : 'hidden'"
    class="py-12 bg-gray-700 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 pt-32">
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
      <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div class="w-full flex justify-start text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="52" height="52"
            viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path
              d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
          </svg>
        </div>
        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">결제 상세</h1>
        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">사용자 이름</label>
        <input id="name"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="홍길동" />
        <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">카드 번호</label>
        <div class="relative mb-5 mt-2">
          <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="20"
              height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24V24H0z" />
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="7" y1="15" x2="7.01" y2="15" />
              <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
          </div>
          <input id="email2"
            class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
            placeholder="XXXX - XXXX - XXXX - XXXX" />
        </div>
        <div class="flex items-center justify-start w-full mt-5">
          <button @click="openKakaoPayPopup"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">결제</button>
          <button @click="hideModal"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
