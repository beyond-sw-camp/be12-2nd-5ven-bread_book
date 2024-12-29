<script setup>
import Header from "./pages/common/Header.vue";
import Footer from "./pages/common/Footer.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <Header v-if="route.meta.showHeader"></Header>
  <router-view></router-view>
  <Footer v-if="route.meta.showFooter"></Footer>
</template>

<style scoped>

</style>
