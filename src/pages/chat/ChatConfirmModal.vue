<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">채팅하시겠습니까?</h2>
      <div class="flex justify-end">
        <button @click="confirmChat" class="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-500">예</button>
        <button @click="closeModal" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">아니오</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ isVisible: Boolean });
const emit = defineEmits(['confirm', 'close']);

const confirmChat = () => emit('confirm');
const closeModal = () => emit('close');
</script>
