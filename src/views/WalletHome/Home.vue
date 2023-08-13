<template>
  <div>
    <Header />
    <div class="flex flex-col items-center">
      <div
        class="w-60 flex flex-row px-3.5 py-1 rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800 position-relative">
        <p class="truncate" @mouseover="showTip = true" @mouseleave="showTip = false">{{ AccountID }}</p>

        <img v-if="isCopied" alt="Vue logo" src="@/assets/free-icon-copyVerify-8467662.png" width="20" height="10" />

        <img v-else alt="Vue logo" src="@/assets/free-icon-copy-8467658.png" width="20" height="10" @click="doCopy" />

        <div v-if="showTip && isCopied" class="showtip ">
          복사완료!
        </div>
      </div>



      <div>
        <h2 class="text-4xl font-bold mt-6 ">{{ Amount }}</h2>
      </div>

      <div class="text-2xl">
        <h1>{{ formatCurrency(ConvertAccount) + Currency }}</h1>
      </div>

      <div class="flex flex-row mt-6 gap-x-10">
        <button @click="testExtension"
          class="mr-2 p-0 w-14 h-14 bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full  active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                          C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                          C15.952,9,16,9.447,16,10z" />
          </svg>
        </button>

        <button type="button" @click="goTosendBoom"
          class="text-white bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="p-0 w-9 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </button>

        <button type="button" @click="goToPortfolio"
          class="text-white bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="p-0 w-9 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>
        </button>
      </div>

      <div class="flex flex-row mt-3 gap-x-14">
        <p class="ml-4 mr-3">{{ $t("message.Home.buy") }}</p>
        <p>{{ $t("message.Home.send") }}</p>
        <p>{{ $t("message.Home.portfolio") }}</p>
      </div>

      <div class="bg-white mt-6">
        <nav class="flex flex-row sm:flex-row gap-x-4">
          <button :class="{
            'text-blue-500 border-b-2 font-medium border-blue-500': activeTab === 'tokens',
            'text-gray-600': activeTab !== 'tokens'
          }" @click="ClickTab('tokens')" class="w-full py-4 px-8 block hover:text-blue-500 focus:outline-none">
            {{ $t("message.Home.Tokens") }}
          </button>
          <button :class="{
            'text-blue-500 border-b-2 font-medium border-blue-500': activeTab === 'nft',
            'text-gray-600': activeTab !== 'nft'
          }" @click="ClickTab('nft')" class="w-full py-4 px-8 block hover:text-blue-500 focus:outline-none">
            NFT
          </button>
          <button :class="{
            'text-blue-500 border-b-2 font-medium border-blue-500': activeTab === 'activity',
            'text-gray-600': activeTab !== 'activity'
          }" @click="ClickTab('activity')" class="w-full py-4 px-8 block hover:text-blue-500 focus:outline-none">
            {{ $t("message.Home.activity") }}
          </button>
        </nav>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>
  
<script>
import Header from '../../components/Header.vue';
import { getBusterAccountState, getBitTestState, getEthState, getNearAccountState } from '../../NetworkAPI/GetAccountStateAPI.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'tokens',
      AccountID: '',
      Amount: '',
      ConvertAccount: '',
      Currency: localStorage.getItem('currency'),
      Network: '',
      isCopied: false,
      showTip: false,
    };
  },
  methods: {
    testExtension() {
      //console.log('testExtension 들어옴');
      window.chrome.runtime.sendMessage(
        'hodghjlmapccamgdngdgnaamiiabflmo',  // 확장 프로그램의 ID
        { message: "getLocalStorage", key: 'key' },  // 메시지와 키 보내기
        function (response) {
          //console.log(response.data);  // 확장 프로그램으로부터 받은 데이터 출력
        }
      );

    },
    ClickTab(tab) {
      this.activeTab = tab;
      if (tab === 'tokens') {
        this.$router.push('/Home/Token');
      } else if (tab === 'nft') {
        this.$router.push('/Home/NFT');
      } else if (tab === 'activity') {
        this.$router.push('/Home/Activity');
      }
    },
    goTosendBoom() {
      // 현재 네트워크가 이더리움이면 sepolia로 변경해야함.
      if (localStorage.getItem('network') === 'ethereum') {
        alert('죄송합니다. 현재 저희 wallet에서는 Ethereum Mainnet 송금을 지원하지 않습니다. Sepolia 만 송금 가능합니다.');
      } else {
        this.$router.push('/SendBoom');
      }

    },
    goToPortfolio() {
      this.$router.push('/Portfolio');
    },
    doCopy() {
      this.$copyText(this.AccountID);
      //console.log('복사완료');
      this.isCopied = true;
      //console.log('복사 후 isCopied:', this.isCopied);
    },
    setAmount(Amount) {
      const network = localStorage.getItem('network');
      let cryptoCurrency;

      if (network === 'bitcoin') {
        cryptoCurrency = 'bitcoin';
      } else if (network === 'ethereum') {
        cryptoCurrency = 'ethereum';
      } else {
        cryptoCurrency = 'near';
      }

      const Price = parseFloat(Amount);

      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
          const cryptoPrice = data[cryptoCurrency].usd;
          const convertedPrice = Price * cryptoPrice;
          this.ConvertAccount = convertedPrice;

          //console.log(`${cryptoCurrency} price in USD: $${cryptoPrice}`);
          //console.log(`Converted Boom price in USD: $${convertedPrice}`);

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

          //console.log(`USD price: $${price}`);
          //console.log(`Converted Boom price in ${currencyCode}: ₩${convertedPrice}`);

          // 통화 변경
          this.Currency = currencyCode;

        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.Currency
      });

      return formatter.format(value);
    },
    GetID() {
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
          //console.log("해당 네트워크의 id :", parsedValue.Buster.implicitAccountId);
          this.AccountID = parsedValue.Buster.implicitAccountId;
        } else if (this.Network === 'near') {
          //console.log("해당 네트워크의 id :", parsedValue.near.implicitAccountId);
          this.AccountID = parsedValue.near.implicitAccountId;
        } else if (this.Network === 'ethereum') {
          //console.log("해당 네트워크의 id :", parsedValue.ethereum.publicKey);
          this.AccountID = parsedValue.ethereum.publicKey;
        } else if (this.Network === 'bitTest') {
          //console.log("해당 네트워크의 id :", parsedValue.bitTest.publicKey);
          this.AccountID = parsedValue.bitTest.publicKey;
        } else {
          //console.log("Sepolia 해당 네트워크의 id :", parsedValue.ethereum.publicKey);
          this.AccountID = parsedValue.ethereum.publicKey;
        }



      } else {
        //console.log("No value found for the storage key:", storageKey);
      }
    },
    changeLanguage(lang) {
      //console.log('changeLanguage() 들어옴:', lang);
      this.$i18n.locale = lang;
      //console.log('this.$i18n :', this.$i18n);
      //console.log('this.$i18n currentLocale :', this.$i18n.currentLocale);
      //console.log('this.$i18n currentLocale._value', this.$i18n.currentLocale._value);
      this.$i18n.currentLocale.value = lang;
      this.$i18n.changeLocale = lang;
      //console.log('this.$i18n.changeLocale:', this.$i18n.changeLocale);
      //console.log('this.$i18n :', this);
      //console.log('this.$i18n.locale:', this.$i18n.locale);
    },
  },
  async created() {
    this.$router.push('/Home/Token');

    // 현재 네트워크가 무엇인지 확인하고 
    //console.log('현재 네트워크 :', localStorage.getItem('network'));
    // 각 네트워크의 암시적 계정, publicKey를 가져와야 한다.


    this.GetID();

    // 현재 네트워크에 따라서 계정 조회하는 함수 달라짐
    switch (this.Network) {
      case 'Buster':
        const Busterdata = await getBusterAccountState(this.AccountID);
        //console.log('getAccountState:', Busterdata);
        this.Amount = Busterdata + "Boom";
        this.setAmount(this.Amount);

        break;

      case 'near':
        const Neardata = await getNearAccountState(this.AccountID);
        //console.log('getNearAccountState:', Neardata);
        if (Neardata === 'notExist') {
          //console.log('해당 near 계정은 존재하지 않는 계정');
          this.Amount = '-NEAR';
        } else {
          this.Amount = parseFloat(Neardata).toFixed(5) + "NEAR";
          this.setAmount(this.Amount);
        }

        break;

      case 'ethereum':
        const EthData = await getEthState(this.AccountID, 'mainnet');
        //console.log('getEthState :', EthData);

        if (EthData.balance === '0') {
          //console.log('ethereum 잔액 0원');
          this.Amount = EthData.balance + 'ETH';
        } else {
          //console.log('ethereum 잔액 0원 아님');
          this.Amount = parseFloat(EthData.balance).toFixed(5) + 'ETH';
        }

        this.setAmount(this.Amount);
        break;

      case 'bitTest':
        const bitTestdata = await getBitTestState(this.AccountID);
        //console.log('getBitTestState :', bitTestdata);
        this.Amount = bitTestdata.data.balance + ' BTC';
        this.setAmount(this.Amount);
        break;

      case 'sepolia':
        const SepoliaData = await getEthState(this.AccountID, 'sepolia');
        //console.log('getEthState :', SepoliaData);
        this.Amount = parseFloat(SepoliaData.balance).toFixed(5) + 'ETH';
        this.setAmount(this.Amount);
        break;
    }

  },
  mounted() {
    // 현재 설정되어있는 언어가 어떤건지 확인하기
    //console.log('isCopied:', this.isCopied);

  }
};
</script>
  
<style>
.showtip {
  position: absolute;
  top: 50px;
  left: 160px;
  background-color: #c4caf0;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

/* 말풍선을 나타낼 tooltip에 대한 스타일 */
.showtip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 8px;
  border-style: solid;

  border-color: #c4caf0 transparent transparent transparent;
}

/* 필요에 따라 더 많은 스타일을 추가할 수 있습니다. */
</style>







