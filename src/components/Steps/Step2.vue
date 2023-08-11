<template>
    <header>
        <div class="flex justify-center">
            <span
                class="px-3.5 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800 mr-20">
                1
            </span>
            <span class="px-3 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800 mr-20">
                2
            </span>
            <span class="px-3 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-300">
                3
            </span>
        </div>

        <div class="flex justify-center mt-2">
            <p class="mr-5 ml-3">{{ $t("message.header.createPw") }}</p>
            <p class="mr-5">{{ $t("message.header.createMnemonic") }}</p>
            <p class="">{{ $t("message.header.checkMnemonic") }}</p>
        </div>
        <div>
            <h2 class="text-2xl font-bold flex justify-center mt-6">
                {{ $t("message.step2.title") }}
            </h2>
            <p class="text-center mt-6">
                {{ $t("message.step2.description") }}
            </p>
        </div>

        <div id="colum" class="pr-8 mt-5 grid grid-cols-3 grid-rows-4 grid-flow-row gap-2 gap-x-10">
            <div v-for="(a, i) in seedPhrase" :key="i / 12">
                <div
                    class="float-left justify-center flex w-28 px-2 py-2 rounded-full text-indigo-800 border border-indigo-800">
                    {{ i + 1 }}. {{ a }}
                </div>
            </div>
        </div>

        <div class="flex justify-end">
            <button type="button" @click="doCopy" class="mt-5 text-indigo-800">
                <!--{{ copySuccess ? "복사 성공!" : "클립보드에 복사" }}-->
                {{
                    copySuccess
                    ? $t("message.step2.copySuccess")
                    : $t("message.step2.clipBoardCopy")
                }}
            </button>
        </div>

        <button type="button" @click="goToStep3" style="background-color: rgb(45, 76, 135)"
            class="mt-5 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            {{ $t("message.default.next") }}
        </button>

    </header>
</template>

<script>
// Vue clipboard 라이브러리
import VueClipboard from 'vue-clipboard2';


export default {

    components: {
        VueClipboard,
    },

    data() {
        return {
            nimonic: ['response', 'chase', 'salon', 'ladder', 'super', 'recall', 'west', 'humor',
                'pulse', 'giant', 'draft', 'leopard'],
            copySuccess: false,
            seedPhrase: [],
            keyPair: []

        }
    },
    // vue 인스턴스에서 사용가능한 메소드 정의 : 호출되는 순간에 동작한다.
    methods: {
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
        // 니모닉 문구 배열을 문자열로 저장하는 메서드
        doCopy() {
            this.$copyText(this.seedPhrase.join(' '));
            console.log('복사완료');
            this.copySuccess = true;
        },
        goToStep3() {
            console.log(this.seedPhrase);
            this.$router.push({ name: 'CheckNimonic', params: { nimonic: this.seedPhrase } });
        }
    },
    created() { // vue 라이프 사이클 : 인스턴스 생성되고 초기화된 직후에 한번 실행됨
        fetch("http://221.148.25.26:4000/generateSeedPhrase")
            .then((response) => response.json())
            .then((data) => {
                this.seedPhrase = data.seedPhrase.split(' ');
                this.keyPair = {
                    secretKey: data.secretKey,
                    publicKey: data.publicKey,
                };
                console.log(data);
                console.log(this.keyPair);

            })
            .catch((error) => console.error("Error:", error));
    },
    mounted() {

        const lang = localStorage.getItem('language');
        console.log('현재 lang : ', lang);
        if (lang === '한국어') {
            console.log('한국어');
            this.changeLanguage('ko');
        } else {
            this.changeLanguage('en');
        }

    }

}
</script>
