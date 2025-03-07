<script setup>
import HomeTitle from "/src/pages/home/HomeTitle.vue";
import HomeSearchField from "/src/pages/home/HomeSearchField.vue";
// [Test in progress] 백엔드 연동을 위해 임시 교체 시도중
// import HomeBookList from "/src/pages/common/BookList.vue";
import HomeBookList from "/src/pages/common/ProductList.vue";
</script>

<template>
  <main style="margin-top: 4.5rem;">
    <HomeTitle></HomeTitle>
    <HomeSearchField></HomeSearchField>
    <HomeBookList></HomeBookList>
  </main>
</template>

<style scoped>

</style>