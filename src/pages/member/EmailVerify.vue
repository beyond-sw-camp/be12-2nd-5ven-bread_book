<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';
import { useLoadingStore } from '../../stores/useLoadingStore';

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();
const loadingStore = useLoadingStore();

onMounted(async () => {
    console.log(route.params);
    loadingStore.startLoading();
    const response = await memberStore.emailVerify(route.params.uuid);
    loadingStore.stopLoading();
    console.log(response);
    if(response.data.isSuccess) {
        router.push("/verify_success");
    }
})


</script>

<template>
    <div style="display: none;">
        이메일 인증 중
    </div>
</template>

<style scoped>

</style>