<template>
    <Header />
    <!--현재 network가 뭔지에 따라서 UI가 달라져야 한다.-->
    <Buster v-if="isBuster" :accountID="AccountID" />
    <Near v-if="isNear" :accountID="AccountID" />
    <Ethereum v-if="isEth" :accountID="AccountID" />
    <Bitcoin v-if="isBitcoin" :accountID="AccountID" />
    <Sepolia v-if="isSepolia" :accountID="AccountID" />
</template>

<script>
import Header from '../../components/Header.vue';
import Buster from '../../components/TxHistory/Buster.vue';
import Near from '../../components/TxHistory/Near.vue';
import Ethereum from '../../components/TxHistory/Ethereum.vue';
import Bitcoin from '../../components/TxHistory/Bitcoin.vue';
import Sepolia from '../../components/TxHistory/Sepolia.vue';

export default {
    components: {
        Header,
        Buster,
        Near,
        Ethereum,
        Bitcoin,
        Sepolia
    },
    data() {
        return {
            AccountID: '',
            isBuster: false,
            isNear: false,
            isEth: false,
            isBitcoin: false,
            isSepolia: false,
            Network: ''
        }
    },
    mounted() {
        console.log('this.$route.params.network:', this.$route.params.network);
        console.log('this.$route.params.accountId:', this.$route.params.accountId);
        this.Network = this.$route.params.network;

        if (this.Network === 'Buster') {
            //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
            //현재 Buster
            console.log("해당 네트워크의 id :", this.$route.params.accountId);
            this.isBuster = true;
            this.AccountID = this.$route.params.accountId;

        } else if (this.Network === 'near') {
            //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
            //현재 Near
            this.isNear = true;
            console.log('isNear :', this.isBuster);
            console.log("해당 네트워크의 id :", this.$route.params.accountId);
            this.AccountID = this.$route.params.accountId

        } else if (this.Network === 'ethereum') {
            //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
            //현재 Eth
            this.isEth = true;
            console.log('isEth :', this.isEth);
            console.log("해당 네트워크의 id :", this.$route.params.accountId);
            this.AccountID = this.$route.params.accountId
        }
        else if (this.Network === 'sepolia') {
            //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
            //현재 Eth
            this.isSepolia = true;
            console.log('isSepolia :', this.isSepolia);
            console.log("해당 네트워크의 id :", this.$route.params.accountId);
            this.AccountID = this.$route.params.accountId


        }
        else {
            //현재 네트워크에 맞는 txhistory 컴포넌트로 바꾸기 위함.
            //현재 Bitcoin
            this.isBitcoin = true;
            console.log('isBitcoin :', this.isBitcoin);
            console.log("해당 네트워크의 id :", this.$route.params.accountId);
            this.AccountID = this.$route.params.accountId;

        }

    }
}
</script>

<style></style>