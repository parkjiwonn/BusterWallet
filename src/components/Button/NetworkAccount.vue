<template>
    <button type="button" @click="handleButtonClick"
        class="mr-5  px-4  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        {{ $t("message.networkAccount.createAccount") }}

    </button>
</template>

<script>

import { createBitTestAccount, createEthAccount, createNearAccount } from '../../NetworkAPI/CreateAccountAPI.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.

export default {


    props: {
        message: String
    },
    data() {
        return {

        }
    },
    methods: {
        async fetchData(network) {
            try {
                switch (network) {

                    case 'near':
                        //console.log('fetchData(near)');
                        const NearData = await createNearAccount();
                        //console.log('createNearAccount :', NearData);
                        //console.log('NearData PublicKey :', NearData.publicKey);
                        this.sendMessage('near', NearData.publicKey);
                        break;

                    case 'ethereum':
                        //console.log('fetchData(ethereum)');
                        const Ethdata = await createEthAccount();
                        //console.log('createEthAccount :', Ethdata);
                        //console.log('Ethdata PublicKey :', Ethdata.publicKey);
                        this.sendMessage('ethereum', Ethdata.publicKey);
                        break;

                    case 'BitTest':
                        //console.log('fetchData(BitTest)');
                        const BitTestdata = await createBitTestAccount();
                        //console.log('createBitTestAccount : ', BitTestdata);
                        //console.log('BitTest PublicKey :', BitTestdata.publicKey);
                        this.sendMessage('BitTest', BitTestdata.publicKey);

                        break;
                }



            } catch (error) {
                // Handle error here
            }
        },
        sendMessage(network, publicKey) {
            this.$emit('message-from-child', { network, publicKey });

        },
        handleButtonClick() {
            //console.log('handleButtonClick()', this.message);
            // 어떤 네트워크에서 새계정을 생성하겠다고했는지 확인
            if (this.message === 'near') {
                // near 
                this.fetchData('near');

            } else if (this.message === 'ethereum') {
                // ethereum
                this.fetchData('ethereum');
            } else {
                // bitcoin Testnet
                this.fetchData('BitTest');

            }
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },


    },
    created() {
        // 현재 설정되어있는 언어가 어떤건지 확인하기
        const lang = localStorage.getItem('language');
        //console.log('현재 lang : ', lang);
        if (lang === '한국어') {
            //console.log('한국어');
            this.changeLanguage('ko');
        } else {
            this.changeLanguage('en');
        }
    }
}
</script>