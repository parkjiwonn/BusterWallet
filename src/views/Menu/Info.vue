<template>
    <Header />
    <div class="flex flex-start flex-col">

        <button class="mb-10 mt-10 font-bold" @click="goToPrivacy">개인정보처리방침</button>
        <button class="font-bold" @click="goToTerm">이용약관</button>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name: "App",
    components: {
        Header,
    },
    data() {
        return {

        };
    },
    methods: {
        goToPrivacy() {
            this.$router.push('/PrivacyContent');

        },
        goToTerm() {
            this.$router.push('/TermContent');
        }
    }

}
</script>