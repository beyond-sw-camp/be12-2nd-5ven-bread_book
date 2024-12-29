<script setup>
import { useLoadingStore } from './stores/useLoadingStore';

const loadingStore = useLoadingStore()
</script>

<template>
  <!-- <router-link to="/login">login</router-link>
  <br/> -->
  <div v-if="loadingStore.isLoading" class="loading-overlay">
      <div class="spinner"></div>
   </div>
  <router-link to="/chat">chat</router-link>
  <br/>
  <router-link to="/myproduct_home/myproductstores">myproduct_home</router-link>
  <br/>
  
  <router-view></router-view>
</template>

<style scoped>

</style>
