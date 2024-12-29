<script>
import HomeTitle from "/src/pages/home/HomeTitle.vue";
import HomeSearchField from "/src/pages/home/HomeSearchField.vue";
import HomeBookList from "/src/pages/home/HomeBookList.vue";
export default {
  name: "Home",
  components: {HomeTitle, HomeSearchField, HomeBookList},
};
</script>

<template>
  <main>
    <HomeTitle></HomeTitle>
    <HomeSearchField></HomeSearchField>
    <HomeBookList></HomeBookList>
  </main>
</template>

<style scoped>

</style>