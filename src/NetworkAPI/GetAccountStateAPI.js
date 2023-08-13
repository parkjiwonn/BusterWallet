// api.js

export async function getBusterAccountState(accountId) {
    try {   
        const response = await fetch('https://theblockbuster.org/wallet-server/getAccountState', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountId: accountId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log('api.js에서 data:', data);
        let yoctoBoom = data.amount;
        // Near 계정의 amount 자릿수에 따라서 변환하기
        const NEAR_FACTOR = 24;
        const length = yoctoBoom.length;

        if (length <= NEAR_FACTOR) {
            return '0.' + yoctoBoom.padStart(NEAR_FACTOR, '0');
        } else {
            return BigInt(yoctoBoom) / BigInt('1000000000000000000000000');
        }


    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getNearAccountState(accountId) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/near/getState?account=${accountId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // 등록되지 않은 계정인 경우 예외처리 해줘야 함.
        //console.log('Near account state :', data);
        if ('notExist' in data) {
            // 만약 존재하지 않는 계정이라면
            //console.log('notExist exists in data:', data.notExist);
            return 'notExist';
        }
        //console.log('Near amount :', data.amount);
        let yoctoNEAR = data.amount;
        let NEAR = yoctoNEAR.slice(0, -24) + '.' + yoctoNEAR.slice(-24);
        //console.log(NEAR + ' NEAR');  // Outputs: '999.916070150000000000000 NEAR'

        // Near 계정의 amount 자릿수에 따라서 변환하기
        const NEAR_FACTOR = 24;
        const length = yoctoNEAR.length;

        if (length <= NEAR_FACTOR) {
            return '0.' + yoctoNEAR.padStart(NEAR_FACTOR, '0');
        } else {
            return BigInt(yoctoNEAR) / BigInt('1000000000000000000000000');
        }

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


// New function, fetchBitTestState
export async function getBitTestState(address) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/bitcoin/getStateTestnet?address=${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getEthState(address, network) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/ethereum/getState?network=${network}&account=${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function setAmount(amount, network, currency) {
    try {
        //console.log('setAmount 들어옴');
        //console.log('setAmount() amount:', amount);
        //console.log('setAmount() network:', network);
        //console.log('setAmount() currency:', currency);

        let cryptoCurrency;
        // 현재 어떤 네트워크인지 확인
        if (network === 'bitcoin') {
            cryptoCurrency = 'bitcoin';
        } else if (network === 'ethereum') {
            cryptoCurrency = 'ethereum';
        } else {
            cryptoCurrency = 'near';
        }

        // 환율 & 네트워크 변환해야하는 잔액
        const Price = parseFloat(amount);

        const response1 = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=usd`);
        const data1 = await response1.json();

        const cryptoPrice = data1[cryptoCurrency].usd;
        const convertedPrice = Price * cryptoPrice;

        //console.log(`${cryptoCurrency} price in USD: $${cryptoPrice}`);
        //console.log(`Converted Boom price in USD: $${convertedPrice}`);

        // USD에서 현재 설정된 통화로 변환율 가져오기
        const response2 = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data2 = await response2.json();

        const krwExchangeRate = data2.rates[currency];

        // Boom 가격을 USD에서 현재 설정된 통화로 변환
        const finalPrice = convertedPrice * krwExchangeRate;

        //console.log(`USD price: $${convertedPrice}`);
        //console.log(`Converted ${network} price in ${currency}: ₩${finalPrice}`);

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        const formatPrice = formatter.format(finalPrice);
        const result = {amount : finalPrice, formatPrice: formatPrice}
        
        return result;  // 함수의 가장 마지막에서 결과를 반환하도록 함

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



