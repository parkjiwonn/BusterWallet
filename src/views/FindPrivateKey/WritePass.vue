<template>
    <Header />

    <h2 class="text-2xl  font-bold flex justify-center mt-6">{{ $t("message.viewPrivateKey.title") }}</h2>

    <div class="flex flex-col items-center mt-5">
        <div class="w-60 flex flex-row px-3.5 py-1 rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800">
            <p class="truncate" @mouseover="showTip = true" @mouseleave="showTip = false">{{ AccountID }}</p>
            <img v-if="isCopied" alt="Vue logo" src="@/assets/free-icon-copyVerify-8467662.png" width="20" height="10"
                @click="doCopy" />
            <img v-else alt="Vue logo" src="@/assets/free-icon-copy-8467658.png" width="20" height="10" @click="doCopy" />

        </div>
        <!-- 말풍선을 나타낼 div 요소 -->
        <div v-if="showTip && isCopied" class="tip">
            복사완료!
        </div>
    </div>


    <div class=" relative mt-10">
        <label for="required-password" class="text-gray-700">
            {{ $t("message.writePass.inputPw") }}
            <span class="text-red-500 required-dot">
                *
            </span>
        </label>
        <input ref="cursor" type="password" id="password"
            class="mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
            name="password" v-model="password" />
    </div>
    <div v-if="(!isPasswordValid)" class="text-red-500 mt-2"> {{ $t("message.writePass.invalidPw") }}</div>

    <div class="flex flex-row mt-10">
        <button type="button" @click="goBack"
            class="mr-5 mt-5 py-2 px-4  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.cancel") }}
        </button>

        <button type="button" @click="ViewPrivateKey" style="background-color: rgb(45, 76, 135);"
            class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.verify") }}
        </button>

    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import CryptoJS from 'crypto-js';

export default {
    components: {
        Header
    },
    data() {
        return {
            AccountID: '',
            nowNetwork: '',
            password: '',
            isPasswordValid: true,
            isCopied: false,
            showTip: false,


        }
    },
    methods: {

        ViewPrivateKey() {
            // 유저가 입력한 비밀번호를 해시화
            const userPassword = this.password;
            console.log('userPassword:', userPassword);
            const hashedPassword = CryptoJS.SHA256(userPassword).toString();

            // 로컬 스토리지에서 해시된 비밀번호를 가져옴
            const storedHashedPassword = localStorage.getItem('hasedPW');
            console.log('storedHashedPassword :', storedHashedPassword);
            console.log('hashedPassword:', hashedPassword);
            // 입력된 비밀번호와 로컬 스토리지의 해시된 비밀번호를 비교


            if (hashedPassword === storedHashedPassword) {
                // 비밀번호가 맞다면 다음 화면으로 이동
                console.log('비밀번호 일치함');
                this.$router.push({ name: 'ViewPrivateKey', params: { network: this.nowNetwork } });
            } else {
                // 비밀번호가 맞지 않으면 알림 또는 에러 메시지를 보여줄 수 있습니다.
                console.log('비밀번호가 맞지 않습니다.');
                this.isPasswordValid = false;
            }
        },
        goBack() {
            this.$router.go(-1); // 이전 페이지로 이동
        },
        doCopy() {
            this.$copyText(this.AccountID);
            console.log('복사완료');
            this.isCopied = true;

        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
        startCursor() {
            this.$refs.cursor.focus();
        },

    },
    mounted() {

        this.startCursor();

        // 해당하는 네트워크에 맞춰 id를 가져와야한다.
        this.nowNetwork = this.$route.params.network;
        const storageKey = localStorage.getItem('hasedPW');
        console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);
        console.log("Networks key 정보", parsedValue);
        // local storage에 있는 공개키 or 암시적 계정을 가져와서 set한다.
        switch (this.nowNetwork) {
            case 'buster':
                console.log('buster의 id :', parsedValue.Buster.implicitAccountId);
                this.AccountID = parsedValue.Buster.implicitAccountId;

                break;

            case 'near':
                console.log('near의 id:', parsedValue.near.implicitAccountId);
                this.AccountID = parsedValue.near.implicitAccountId;
                break;

            case 'ethereum':
                console.log('ethereum의 id :', parsedValue.ethereum.publicKey);
                this.AccountID = parsedValue.ethereum.publicKey;
                break;

            case 'bitcoin':
                console.log('bitcoin 의 id:', parsedValue.bitTest.publicKey);
                this.AccountID = parsedValue.bitTest.publicKey;
                break;
        }
    }

}
</script>

<style>
/* 말풍선을 나타낼 tooltip에 대한 스타일 */
.tip {
    position: absolute;
    top: 110px;
    left: 160px;
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
