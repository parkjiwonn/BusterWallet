<template>
    <button type="button" @click="goToTxhistory" class="mt-5 py-2 w-3/4  bg-indigo-800 hover:bg-indigo-700 focus:ring-indigo-500 
        focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 
        text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 
        focus:ring-offset-2  rounded-3xl">
        {{ $t("message.Tx.button") }}
    </button>
</template>

<script>
import Buster from '../TxHistory/Buster.vue';
import Near from '../TxHistory/Near.vue';
import Ethereum from '../TxHistory/Ethereum.vue';
import Bitcoin from '../TxHistory/Bitcoin.vue';
import Sepolia from '../TxHistory/Sepolia.vue';
// import { getEthTxHistory } from '../../NetworkAPI/GetTxHistory.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.

export default {
    components: {
        Buster,
        Near,
        Ethereum,
        Bitcoin,
        Sepolia
    },
    // 지금 네트워크가 무엇인지 확인해야 한다.
    data() {
        return {
            Network: '',
            AccountID: '',
            isBuster: false,
            isNear: false,
            isEth: false,
            isBitcoin: false,
            isSepolia: false,
        }
    },
    async mounted() {
        const storageKey = localStorage.getItem('hasedPW');
        //console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);

        if (storageValue) {
            const parsedValue = JSON.parse(storageValue);
            //console.log("Networks key 정보", parsedValue);
            // 현재 네트워크가 무엇인지 확인해야 한다.
            this.Network = localStorage.getItem('network');
            //console.log("현재 유저의 Network:", this.Network);
            // network에 따라서 가져오는 계정 정보를 다르게 해야 한다.
            // 네트워크 별로 가져와야하는 id가 다르다.

            // 만약 bitcoin, ethereum 이면 publicKey
            // Buster, near 면 implictid 로 가져오게 하기 
            if (this.Network === 'Buster') {
                //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
                //현재 Buster
                this.isBuster = true;
                //console.log('isBuster :', this.isBuster);
                //console.log("해당 네트워크의 id :", parsedValue.Buster.implicitAccountId);
                this.AccountID = parsedValue.Buster.implicitAccountId;

            } else if (this.Network === 'near') {
                //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
                //현재 Near
                this.isNear = true;
                //console.log('isNear :', this.isBuster);
                //console.log("해당 네트워크의 id :", parsedValue.near.implicitAccountId);
                this.AccountID = parsedValue.near.implicitAccountId;

            } else if (this.Network === 'ethereum') {
                //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
                //현재 Eth
                this.isEth = true;
                //console.log('isEth :', this.isEth);
                //console.log("해당 네트워크의 id :", parsedValue.ethereum.publicKey);
                this.AccountID = parsedValue.ethereum.publicKey;
            }
            else if (this.Network === 'sepolia') {
                //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
                //현재 Eth
                this.isSepolia = true;
                //console.log('isSepolia :', this.isSepolia);
                //console.log("해당 네트워크의 id :", parsedValue.ethereum.publicKey);
                this.AccountID = parsedValue.ethereum.publicKey;


            }
            else {
                //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
                //현재 Bitcoin
                this.isBitcoin = true;
                //console.log('isBitcoin :', this.isBitcoin);
                //console.log("해당 네트워크의 id :", parsedValue.bitTest.publicKey);
                this.AccountID = parsedValue.bitTest.publicKey;

            }



        } else {
            //console.log("No value found for the storage key:", storageKey);
        }
    },
    methods: {
        goToTxhistory() {
            this.$router.push({

                name: 'Txhistory', params: { network: this.Network, accountId: this.AccountID }
            });
        }
    }

}
</script>

