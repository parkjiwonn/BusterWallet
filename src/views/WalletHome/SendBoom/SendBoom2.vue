<template>
    <div class="">
        <h2 class="text-2xl  font-bold flex justify-center mt-6"> {{ $t("message.sendBoom2.title") }}</h2>
        <p class="mt-3 font-bold">{{ $t("message.sendBoom2.receiver") }}</p>
        <div class="text-center mt-3 border border-indigo-800 p-2">
            <p class="break-all">{{ this.$route.params.address }}</p>
        </div>

        <div class="flex flex-row mt-5 uppercase">
            <p class="font-bold mt-5">{{ $t("message.sendBoom2.money") }}</p>
            <div class="flex-grow"></div>

            <div class="border border-indigo-800 p-2 w-5/6">
                <div class="flex flex-row">

                    <img class="mr-6" alt="Vue logo" src="@/assets/free-icon-transaction-7736558.png" width="50"
                        height="10" />


                    <div class="flexf flex-col">
                        <p>{{ amountNetwork }}</p>
                        <p>{{ $t("message.sendBoom2.balance") }} : {{ Boom }} </p>
                    </div>
                </div>


            </div>


        </div>


    </div>
    <div class="flex flex-row mt-10">
        <p class="font-bold mr-7">{{ $t("message.sendBoom2.amount") }}</p>

        <div>

            <input ref="cursor" type="text" id="boom" v-model="sendBoom" @input="setBoom(sendBoom)"
                class="rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                name="password" placeholder="0" />

            <p>{{ ConvertAccount }}</p>
        </div>


    </div>

    <div class="border border-gray-300 p-2 w-full mt-10">
        <div class="flex flex-row">
            <p class="font-bold">
                {{ $t("message.sendBoom2.gas") }}
            </p>
            <div class="flex-grow"></div>
            <p>
                {{ $t("message.sendBoom2.yak") }} {{ Gas }}
            </p>
        </div>


    </div>

    <div class="flex flex-row mt-10">
        <button type="button" @click="goBack"
            class="mr-5 mt-5 py-2 px-4  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.cancel") }}
        </button>

        <button type="button" @click="CheckSendBoom" style="background-color: rgb(45, 76, 135);"
            class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.next") }}
        </button>

    </div>
</template>

<script>
import { getBitTestState, getEthState, getNearAccountState } from '../../../NetworkAPI/GetAccountStateAPI.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.
import { SendEth, CalculateGas, SendBuster, SendNear } from '../../../NetworkAPI/SendAmount.js';

export default {
    mounted() {
        this.startCursor();
    },
    methods: {
        startCursor() {
            this.$refs.cursor.focus();
        },
        goBack() {
            // 지갑 메인으로 돌아가기
            this.$router.push('/Home');
        },

        //========================================================================================================================================
        setBoom(value) {
            // 없으면 0으로 세팅
            if (value == '') {
                console.log('0000');
                value = 0;
            }
            const Boom = value;
            const network = localStorage.getItem('network');
            let cryptoCurrency;

            if (network === 'bitcoin') {
                cryptoCurrency = 'bitcoin';
            } else if (network === 'ethereum') {
                cryptoCurrency = 'ethereum';
            } else if (network === 'sepolia') {
                cryptoCurrency = 'ethereum';
            }
            else {
                cryptoCurrency = 'near';
            }

            console.log('cryptoCurrency:', cryptoCurrency);

            const boomPrice = parseFloat(Boom);

            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => {
                    const cryptoPrice = data[cryptoCurrency].usd;
                    const convertedPrice = boomPrice * cryptoPrice;
                    this.ConvertAccount = convertedPrice;

                    console.log(`${cryptoCurrency} price in USD: $${cryptoPrice}`);
                    console.log(`Converted Boom price in USD: $${convertedPrice}`);

                    this.ConvertCurrency(this.ConvertAccount);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        ConvertCurrency(price) {
            // 현재 설정된 통화 종류
            const currencyCode = this.Currency;
            // USD에서 현재 설졍된 통화로 변환율 가져오기
            fetch('https://api.exchangerate-api.com/v4/latest/USD')
                .then(response => response.json())
                .then(data => {
                    const krwExchangeRate = data.rates[currencyCode];

                    // Boom 가격을 USD에서 현재 설정된 통화로 변환
                    const convertedPrice = price * krwExchangeRate;
                    this.ConvertAccount = convertedPrice;

                    console.log(`USD price: $${price}`);
                    console.log(`Converted Boom price in ${currencyCode}: ${convertedPrice}`);

                    // 통화 변경
                    this.Currency = currencyCode;
                    this.formatCurrency(convertedPrice);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async formatCurrency(value) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.Currency
            });
            console.log('formatter.format(value):', formatter.format(value));
            this.ConvertAccount = formatter.format(value);

            // 이더 같은 경우는 입력하는 ETH에 따라서 수수료가 달라져야 한다.
            if (this.Network === 'sepolia') {
                console.log('sepolia 수수료 계산 전 네트워크 확인');
                //========================================
                console.log('this.ReceiverID : ', this.ReceiverID);
                const EthGas = await CalculateGas(this.sendBoom, this.$route.params.address);
                console.log('EthGas :', EthGas.gas);
                this.Gas = EthGas.gas;
            } else {
                console.log('sepolia 아님');
            }

            return formatter.format(value);
        },
        //========================================================================================================================================
        // 전송 버튼을 눌렀을때 실행되는 메서드
        CheckSendBoom() {
            // 보내려는 금액이 자산의 금액보다 큰지 안큰지 확인.
            console.log('CheckSendBoom()');
            const inputAmount = parseFloat(this.sendBoom);
            const boomAmount = parseFloat(this.Boom);

            if (inputAmount <= 0) {
                alert('0보다 큰 값을 입력해주세요.');
            } else if (inputAmount > boomAmount) {
                alert('Boom의 잔액보다 큰 금액을 보낼 수 없습니다.');
            } else {
                // boom 전송
                console.log('전송할 수 있음');
                this.FinalSend(inputAmount);
            }
        },
        async FinalSend(inputAmount) {
            //!!!!!!!!!!!!!!!!!해당 부분 수정해야 함!!!!!!!!!!!!!!!!!

            // 보내려는 양과 수수료를 빼서 보내야 함.
            // Near & Buster 는 수수료가 0.835로 고정이지만
            // Eth 는 변함 
            if (this.Network === 'sepolia') {
                const ethsubtract = inputAmount - this.Gas;
                console.log('ethsubtract :', ethsubtract.toString());
                // sepolia는 ethsubtract를 전송해야한다.
                // senderPrivateKey, receiverAddress,amount 필요함.
                console.log('senderPrivateKey:', this.SenderPrivateKey);
                console.log('receiverAddress:', this.ReceiverID);
                console.log('amount:', ethsubtract.toString());
                const SendEthDATA = await SendEth(this.SenderPrivateKey, this.ReceiverID, ethsubtract.toString());
                console.log('SendEthDATA:', SendEthDATA);
                console.log('txHash:', SendEthDATA.hash);

                // tx hash 가 있다면 
                if (SendEthDATA.hash) {
                    // 송금 성공 
                    // 유저 데이터 담기
                    const userData = {
                        senderAccountId: this.SenderID,
                        receiverAccountId: this.ReceiverID,
                        amount: ethsubtract,
                        gas: this.Gas
                    }
                    console.log('userData:', userData);

                    // SendBoom3로 보내기,
                    // tx hash, userdata, 네트워크 
                    this.$router.push({
                        name: 'SendBoom3', params: {
                            Outcome: JSON.stringify(SendEthDATA.hash),
                            UserData: JSON.stringify(userData),
                            network: 'sepolia'
                        }
                    });


                } else {
                    // 전송 실패 
                    alert('Ethereum sepolia 송금 실패');
                }


            } else {
                // 0.835를 뺀 값을 계산
                const amountToSubtract = 0.00005;
                const subtractedAmount = inputAmount - amountToSubtract;

                console.log('subtractedAmount', subtractedAmount);
                console.log('amountStr', subtractedAmount.toString());

                // near , Buster 는 subtractedAmount를 보내야 한다.
                if (this.Network === 'near') {
                    // 현재 네트워크 near
                    // senderAcountId, senderPrivateKey, receiverId, amountStr 
                    console.log('senderPrivateKey:', this.SenderPrivateKey);
                    console.log('receiverAddress:', this.ReceiverID);
                    console.log('near 전송하기 전 network 확인 :');
                    console.log('this.SenderID:', this.SenderID);
                    console.log('subtractedAmount:', subtractedAmount);
                    const SendNearDATA = await SendNear(this.SenderID, this.SenderPrivateKey, this.ReceiverID, subtractedAmount);
                    console.log('SendNearDATA:', SendNearDATA);

                    // 유저 데이터 담기
                    const userData = {
                        senderAccountId: this.SenderID,
                        receiverAccountId: this.ReceiverID,
                        amount: subtractedAmount,
                        gas: this.Gas
                    }
                    console.log('userData:', userData);

                    // SendBoom3로 보내기,
                    // tx hash, userdata, 네트워크 
                    this.$router.push({
                        name: 'SendBoom3', params: {
                            Outcome: JSON.stringify(SendNearDATA),
                            UserData: JSON.stringify(userData),
                            network: 'near'
                        }
                    });


                } else {
                    // 현재 네트워크 buster.
                    // senderAccountId, senderPrivateKey,receiverID,inputAmount
                    const SendBusterDATA = await SendBuster(this.SenderID, this.SenderPrivateKey, this.ReceiverID, subtractedAmount);
                    console.log('SendBusterDATA:', SendBusterDATA);

                    // 유저 데이터 담기
                    const userData = {
                        senderAccountId: this.SenderID,
                        receiverAccountId: this.ReceiverID,
                        amount: subtractedAmount,
                        gas: this.Gas
                    }
                    console.log('userData:', userData);

                    // SendBoom3로 보내기,
                    // tx hash, userdata, 네트워크 
                    this.$router.push({
                        name: 'SendBoom3', params: {
                            Outcome: JSON.stringify(SendBusterDATA),
                            UserData: JSON.stringify(userData),
                            network: 'Buster'
                        }
                    });
                }

            }

        },
        // 수신자 정하는 메서드
        SetSenderID() {
            console.log('SetSenderID()');
            const storageKey = localStorage.getItem('hasedPW');
            console.log('storageKey', storageKey);
            const storageValue = localStorage.getItem(storageKey);

            if (storageValue) {
                const parsedValue = JSON.parse(storageValue);
                console.log("Networks key 정보", parsedValue);
                // 현재 네트워크가 무엇인지 확인해야 한다.
                this.Network = localStorage.getItem('network');
                console.log("현재 유저의 Network:", this.Network);
                // network에 따라서 가져오는 계정 정보를 다르게 해야 한다.
                // 네트워크 별로 가져와야하는 id가 다르다.

                // 만약 bitcoin, ethereum 이면 publicKey
                // Buster, near 면 implictid 로 가져오게 하기 
                if (this.Network === 'Buster') {
                    console.log("해당 네트워크의 id :", parsedValue.Buster.implicitAccountId);
                    this.SenderID = parsedValue.Buster.implicitAccountId;
                    this.SenderPrivateKey = parsedValue.Buster.privateKey;
                } else if (this.Network === 'near') {
                    console.log("해당 네트워크의 id :", parsedValue.near.implicitAccountId);
                    this.SenderID = parsedValue.near.implicitAccountId;
                    this.SenderPrivateKey = parsedValue.near.privateKey;
                } else if (this.Network === 'sepolia') {
                    console.log("해당 네트워크의 id :", parsedValue.ethereum.publicKey);
                    this.SenderID = parsedValue.ethereum.publicKey;
                    this.SenderPrivateKey = parsedValue.ethereum.privateKey;
                } else {
                    console.log("해당 네트워크의 id :", parsedValue.bitTest.publicKey);
                    this.SenderID = parsedValue.bitTest.publicKey;
                    this.SenderPrivateKey = parsedValue.bitTest.privateKey;
                }



            } else {
                console.log("No value found for the storage key:", storageKey);
            }

        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },

    },
    data() {
        return {
            Boom: '',
            SenderID: '',
            SenderPrivateKey: '',
            sendBoom: '',
            Currency: localStorage.getItem('currency'),
            ConvertAccount: '',
            ReceiverID: this.$route.params.implicitID,
            Network: '',
            amountNetwork: '',
            Gas: ''
        };
    },
    async created() {

        // 현재 설정되어있는 언어가 어떤건지 확인하기
        const lang = localStorage.getItem('language');
        console.log('현재 lang : ', lang);
        if (lang === '한국어') {
            console.log('한국어');
            this.changeLanguage('ko');
        } else {
            this.changeLanguage('en');
        }

        // 발신자 고정하는 메서드 
        this.SetSenderID();
        // 수신자 고정해야함.
        this.ReceiverID = this.$route.params.address;


        // network마다 잔액 확인하는 메서드 다르게 해야 함.
        switch (this.Network) {
            case 'Buster':
                console.log('created() Buster');
                fetch('http://221.148.25.26:4000/getAccountState', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ accountId: this.SenderID })  // 실제 accountId로 교체
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let yoctoBoom = data.amount;
                        this.Boom = BigInt(yoctoBoom) / BigInt("1000000000000000000000000") + ' BOOM';
                        console.log('Boom', this.Boom.toString());  // "10"
                        this.amountNetwork = 'Boom';
                        this.Gas = '0.835 Boom';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                break;

            case 'near':
                console.log('created() near:', this.SenderID);
                this.amountNetwork = 'Near Protocol';
                const Neardata = await getNearAccountState(this.SenderID);
                console.log('getNearAccountState:', Neardata);
                this.Boom = parseFloat(Neardata).toFixed(5) + ' Near';
                this.Gas = '0.835 Near';
                break;

            case 'sepolia':
                console.log('created() ethereum');
                this.amountNetwork = 'Ethereum'
                // ethereum 계정의 상태 정보 가져오기
                const EthData = await getEthState(this.SenderID, 'sepolia');
                console.log('getEthState :', EthData.balance);
                this.Boom = parseFloat(EthData.balance).toFixed(5) + ' ETH';
                this.Gas = '0 ETH'
                break;

            case 'bitTest':
                console.log('created() bitTest');
                // 현재 bitTest에서의 잔액이 얼마인지 확인해야 함.
                const bitTestdata = await getBitTestState(this.SenderID);
                console.log('getBitTestState :', bitTestdata);
                this.Boom = bitTestdata.BTC + ' BTC';
                this.amountNetwork = 'Bitcoin Testnet';
                break;
        }


    }
}
</script>