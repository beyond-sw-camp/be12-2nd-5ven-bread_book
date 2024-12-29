<script setup>
import { useLoadingStore } from './stores/useLoadingStore';
import Header from "./pages/common/Header.vue";
import Footer from "./pages/common/Footer.vue";
import { useRoute } from 'vue-router';

const loadingStore = useLoadingStore()
const route = useRoute();
</script>

<template>
<<<<<<< HEAD
  <!-- <router-link to="/login">login</router-link>
  <br/> -->
  <div v-if="loadingStore.isLoading" class="loading-overlay">
      <div class="spinner"></div>
   </div>
   <Header v-if="route.meta.showHeader"></Header>
   <router-view></router-view>
   <Footer v-if="route.meta.showFooter"></Footer>
  

=======
  <router-link to="/chat">chat</router-link>
  <br/>
  <router-link to="/myproduct_home/myproductstores">myproduct_home</router-link>
  <br/>
  
  <router-view></router-view>
</template>
>>>>>>> 418b02f ([Feat, Init])

<style scoped>

</style>
