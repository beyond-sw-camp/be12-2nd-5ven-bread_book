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
      headers: {
        Authorization: "SECRET_KEY " + VITE_KEY,
        'Content-Type': "application/json"
      }
    }
  );
  console.log(response);
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
  <div :class="isVisible ? 'flex' : 'hidden'" 
    class="fixed inset-0 z-10 bg-gray-700 bg-opacity-50 flex items-center justify-center transition duration-150 ease-in-out">
    <div role="alert" class="bg-white shadow-md rounded border border-gray-400 w-11/12 max-w-lg p-6 md:p-10 flex flex-col items-center text-center">
      <label for="email2" class="text-lg font-bold text-gray-800 mb-5">
        결제하시겠습니까?
      </label>
      <div class="flex justify-center space-x-3">
        <button @click="openKakaoPayPopup"
          class="bg-indigo-700 text-white px-8 py-2 text-sm rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 transition">
          결제
        </button>
        <button @click="hideModal"
          class="bg-gray-100 text-gray-600 px-8 py-2 text-sm rounded border hover:bg-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition">
          취소
        </button>
      </div>
    </div>
  </div>
</template>



