<template>
    <h2 class="text-2xl  font-bold flex justify-center mt-6"> {{ $t("message.sendBoom3.title") }}</h2>
    <div class="flex flex-col ">
        <div class="flex flex-row mb-1 mt-5 ">
            <h2 class="text-xl font-bold w-3/4">From: </h2>
            <p class="mt-1 ml-5 break-all">{{ From }}</p>
        </div>

        <div class="flex flex-row mb-1">
            <h2 class="text-xl font-bold w-3/4">To: </h2>
            <p class="mt-1 ml-5 break-all">{{ To }}</p>
        </div>

        <div class="flex flex-row">
            <h2 class="text-xl font-bold ">Amount: </h2>
            <p class="mt-1 ml-10"> {{ Amount }} </p>
        </div>

        <div class="flex flex-row mb-1 mt-1">
            <h2 class="text-xl font-bold ">Gas: </h2>
            <p class="mt-1 ml-20 truncate">{{ Gas }} </p>
        </div>


        <div class="flex flex-row mb-1">
            <h2 class="text-xl font-bold w-1/2">Tx-Hash: </h2>
            <p class="mt-1 ml-5 break-all">{{ Tx_hash }}</p>
        </div>

        <div class="flex flex-row mb-1">
            <h2 class="text-xl font-bold ">Created at </h2>
            <p class="mt-1 ml-5">{{ Created_at }}</p>
        </div>

        <button type="button" @click="Finish" style="background-color: rgb(45, 76, 135);"
            class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.verify") }}
        </button>
    </div>
</template>

<script>
export default {
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

        const network = this.$route.params.network;
        console.log('SendBoom3 network :', network);

        const userData = JSON.parse(this.$route.params.UserData);

        if (network === 'sepolia') {
            const outcome = this.$route.params.Outcome;
            console.log('userData:', userData);
            // 값 세팅해주기
            this.From = userData.senderAccountId;
            this.To = userData.receiverAccountId;
            this.Amount = userData.amount + ' ETH';
            this.Gas = userData.gas;
            this.Tx_hash = outcome;
            // 현재 시간 세팅하기
            this.setCreatedAt();
        } else {
            const outcome = JSON.parse(this.$route.params.Outcome);

            console.log('outcome', outcome);

            console.log('userData:', userData);
            // 값 세팅해주기
            this.From = userData.senderAccountId;
            this.To = userData.receiverAccountId;

            if (network === 'near') {
                this.Amount = userData.amount + ' NEAR';
            } else {
                this.Amount = userData.amount + ' Boom';
            }

            this.Gas = userData.gas;
            this.Tx_hash = outcome;
            // 현재 시간 세팅하기
            this.setCreatedAt();
        }

    },
    data() {
        return {
            From: '',
            To: '',
            Amount: '',
            Gas: '',
            Tx_hash: '',
            Created_at: ''

        }
    },
    methods: {
        setCreatedAt() {
            // 시간 세팅하는 메서드
            const now = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const year = now.getFullYear();
            const month = months[now.getMonth()];
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            this.Created_at = `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;

            console.log('setCreatedAt()', this.Created_at);
        },
        Finish() {
            this.$router.push('/Home');
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
    }
}
</script>