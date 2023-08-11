<template>
    <Header />
    <h2 class="text-2xl  font-bold flex justify-center mt-6">{{ $t("message.viewPrivateKey.title") }}</h2>

    <div class="flex flex-row">
        <p class="mt-3 font-bold">{{ Network }} {{ $t("message.viewPrivateKey.text") }} </p>
        <img v-if="isCopied" class="py-2 mt-1 ml-2" alt="Vue logo" src="@/assets/free-icon-copyVerify-8467662.png"
            width="20" height="10" />
        <img v-else class="py-2 mt-1 ml-2" alt="Vue logo" src="@/assets/free-icon-copy-8467658.png" width="20" height="10"
            @click="doCopy" />
    </div>

    <div class="text-center mt-3 border border-indigo-800 p-2">
        <p @mouseover="showTip = true" @mouseleave="showTip = false" class="break-all">{{ PrivateKey }}</p>
    </div>

    <!-- 말풍선을 나타낼 div 요소 -->
    <div v-if="showTip && isCopied" class="tip">
        복사완료!
    </div>

    <div class="flex bg-red-100 rounded-lg p-4 mb-4 mt-5 text-sm text-red-700" role="alert">
        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
        </svg>
        <div>
            <span class="font-medium">{{
                $t("message.viewPrivateKey.warnText")
            }}</span> {{ $t("message.viewPrivateKey.warnTextDescription") }}
        </div>
    </div>

    <button type="button" @click="goToHome" style="background-color: rgb(45, 76, 135);"
        class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        {{ $t("message.default.verify") }}
    </button>
</template>

<script>
import Header from '../../components/Header.vue';
export default {
    components: {
        Header
    },
    data() {
        return {
            Network: '',
            PrivateKey: '',
            isCopied: false,
            showTip: false,
        }
    },
    methods: {
        goToHome() {
            this.$router.push('/Home/Token');
        },
        doCopy() {
            this.$copyText(this.PrivateKey);
            console.log('복사완료');
            this.isCopied = true;
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
    },
    mounted() {

        // 현재 설정되어있는 언어가 어떤건지 확인하기
        const lang = localStorage.getItem('language');
        console.log('현재 lang : ', lang);
        if (lang === '한국어') {
            console.log('한국어');
            this.changeLanguage('ko');
        } else {
            this.changeLanguage('en');
        }

        this.Network = this.$route.params.network;
        console.log('network :', this.Network);

        const storageKey = localStorage.getItem('hasedPW');
        console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);
        console.log("Networks key 정보", parsedValue);
        // local storage에 있는 공개키 or 암시적 계정을 가져와서 set한다.
        switch (this.Network) {
            case 'buster':
                console.log('buster의 privateKey :', parsedValue.Buster.privateKey);
                this.PrivateKey = parsedValue.Buster.privateKey;
                console.log('this.PrivateKey :', this.PrivateKey);

                break;

            case 'near':
                console.log('near의 privateKey :', parsedValue.near.PrivateKey);
                this.PrivateKey = parsedValue.near.privateKey;
                break;

            case 'ethereum':
                console.log('ethereum의 privateKey :', parsedValue.ethereum.PrivateKey);
                this.PrivateKey = parsedValue.ethereum.privateKey;
                break;

            case 'bitcoin':
                console.log('bitcoin 의 privateKey:', parsedValue.bitTest.PrivateKey);
                this.PrivateKey = parsedValue.bitTest.privateKey;
                break;
        }
    }
}
</script>

<style>
/* 말풍선을 나타낼 tooltip에 대한 스타일 */
.tip {
    position: absolute;
    top: 150px;
    left: 250px;
    background-color: #c4caf0;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 100;
}

/* 필요에 따라 더 많은 스타일을 추가할 수 있습니다. */

.tip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #c4caf0 transparent transparent transparent;
}
</style>