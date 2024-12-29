<script setup>
import { useLoadingStore } from './stores/useLoadingStore';
import Header from "./pages/common/Header.vue";
import Footer from "./pages/common/Footer.vue";
import { useRoute } from 'vue-router';

const loadingStore = useLoadingStore()
const route = useRoute();
</script>

<template>
  <!-- <router-link to="/login">login</router-link>
  <br/> -->
  <div v-if="loadingStore.isLoading" class="loading-overlay">
      <div class="spinner"></div>
   </div>
   <Header v-if="route.meta.showHeader"></Header>
   <router-view></router-view>
   <Footer v-if="route.meta.showFooter"></Footer>
  


<style scoped>

</style>
