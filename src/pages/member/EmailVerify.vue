<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();

onMounted(async () => {
    console.log(route.params);
    const response = await memberStore.emailVerify(route.params.uuid);
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