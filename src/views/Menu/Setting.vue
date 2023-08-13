<template>
    <Header />
    <h2 class="text-2xl  font-bold flex justify-center mt-6">{{ $t("message.setting.title") }}</h2>
    <div class="px-4">

        <div class="flex flex-row mt-10 justify-between items-center">

            <p class="font-bold  "> 버전 </p>

            <p class="font-bold  "> v0.0.0.1 </p>
        </div>

        <div class="flex flex-row mt-10 justify-between items-center">

            <p class="font-bold  w-1/2"> {{ $t("message.setting.changeCurrency") }} </p>

            <div id="example-5" class="demo">

                <select v-model="selected1">
                    <option v-for="(item, index) in CurrencyList" :key="index" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
        </div>

        <div class="flex flex-row mt-10 justify-between items-center">

            <p class="font-bold w-1/2"> {{ $t("message.setting.changeLanguage") }} </p>

            <div id="example-5" class="demo">

                <select v-model="selected2">
                    <option v-for="(item, index) in LanguageList" :key="index" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
        </div>

        <div class="flex flex-row  mt-10 justify-between items-center">

            <p class="font-bold w-1/2 "> {{ $t("message.setting.changeNetwork") }} </p>

            <div id="example-5" class="demo">

                <select v-model="selected3">
                    <option v-for="(item, index) in NetworkList" :key="index" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: {
        Header
    },
    watch: {
        selected3(newValue) {
            //console.log('selected3', newValue);
            if (newValue === '') {
                //console.log('buster 선택');
                localStorage.setItem('network', 'near');
            } else {
                localStorage.setItem('network', newValue);
            }

        },
        selected1(newValue) {
            if (newValue === '') {
                //console.log('USD 선택');
                localStorage.setItem('currency', 'USD');
            } else {
                //console.log('통화 선택:', newValue);
                localStorage.setItem('currency', newValue);
            }
        },
        selected2(newValue) {
            if (this.userTriggered) {
                if (newValue === 'ko') {
                    localStorage.setItem('language', 'ko');
                    alert('한국어로 언어변경이 완료되었습니다.');
                    this.$router.go();


                } else {
                    localStorage.setItem('language', 'en');
                    alert('영어로 언어변경이 완료되었습니다.');
                    this.$router.go();
                }

            }
            if (newValue === 'ko') {
                //console.log('한국어 선택');
                localStorage.setItem('language', 'ko');
            } else {
                localStorage.setItem('language', 'en');
            }
            this.userTriggered = true;
        }
    },
    data() {
        return {
            selected1: "",
            selected2: "",
            selected3: "",
            reRenderKey: 0,
            userTriggered: false,
            CurrencyList: [
                { name: "USD", value: "USD" },
                { name: "EUR", value: "EUR" },
                { name: "GBP", value: "GBP" },
                { name: "CAD", value: "CAD" },
                { name: "AUD", value: "AUD" },
                { name: "JPY", value: "JPY" },
                { name: "CNY", value: "CNY" },
                { name: "INR", value: "INR" },
                { name: "BRL", value: "BRL" },
                { name: "ZAR", value: "ZAR" },
                { name: "RUB", value: "RUB" },
                { name: "KRW", value: "KRW" },
                { name: "IDR", value: "IDR" },
                { name: "MXN", value: "MXN" },
                { name: "NZD", value: "NZD" },
                { name: "THB", value: "THB" },
                { name: "TRY", value: "TRY" },
            ],
            LanguageList: [
                { name: "한국어", value: "ko" },
                { name: "English", value: "en" },
            ],
            NetworkList: [],
        };
    },
    methods: {


    },
    created() {

        //console.log('created()');
        const network = localStorage.getItem('network');
        //console.log('network : ', network);
        this.selected3 = network;

        const currency = localStorage.getItem('currency');
        this.selected1 = currency;

        const language = localStorage.getItem('language');
        this.selected2 = language;
        this.userTriggered = false;
    },
    mounted() {
        const storageKey = localStorage.getItem('hasedPW');
        //console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);

        if (storageValue) {
            const parsedValue = JSON.parse(storageValue);
            //console.log('현재 보유중인 네트워크 parsedValue :', parsedValue);

            for (const index in Object.keys(parsedValue)) {
                const network = Object.keys(parsedValue)[index];
                //console.log('network 하나씩 :', network);

                if (network === 'Buster') {
                    //console.log('network is Buster');
                    this.NetworkList.push({ name: 'Buster', value: 'Buster' });
                } else if (network === 'near') {
                    //console.log('network is near');
                    this.NetworkList.push({ name: 'NearProtocol', value: 'near' });
                } else if (network === 'ethereum') {
                    //console.log('network is ethereum');
                    this.NetworkList.push({ name: 'Ethereum', value: 'ethereum' });
                    this.NetworkList.push({ name: 'Sepolia (Ethereum Testnet)', value: 'sepolia' });

                } else {
                    //console.log('network is bitcoinTestnet');
                    this.NetworkList.push({ name: 'Bitcoin Testnet', value: 'bitTest' });
                }
            }

        } else {
            //console.log("No value found for the storage key:", storageKey);
        }
    }
}
</script>