// api.js

export async function createBitTestAccount() {
    try {
        const response = await fetch('https://theblockbuster.org/wallet-server/bitcoin/createTestnet');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log(data);
        //console.log(data.address);
        //console.log(data.privateKey);

        const publicKey = data.address;
        const privateKey = data.privateKey;

        const keyPairObject = { publicKey: publicKey, privateKey: privateKey };
        const bitMainObject = { bitTest: keyPairObject };

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, bitMainObject);
        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('bitMain 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));

        return keyPairObject;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function createNearAccount() {
    try {
        const response = await fetch('https://theblockbuster.org/wallet-server/near/createAccount');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log(data);
        //console.log(data.publicKey);
        //console.log(data.privateKey);

        const publicKey = data.publicKey;
        const privateKey = data.privateKey;
        const implicitAccountId = data.implicitAccountId;

        const keyPairObject = { publicKey: publicKey, privateKey: privateKey, implicitAccountId:implicitAccountId };
        const NearObject = { near: keyPairObject };

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, NearObject);
        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('bitMain 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));

        return keyPairObject;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function createEthAccount() {
    try {
        //console.log('createEthAccount1');
        const response = await fetch('https://theblockbuster.org/wallet-server/ethereum/createAccount');
        //console.log('createEthAccount2');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('createEthAccount()의 data : ',data);
        //console.log(data.address);
        //console.log(data.privateKey);

        const publicKey = data.address;
        const privateKey = data.privateKey;

        const keyPairObject = { publicKey: publicKey, privateKey: privateKey };
        const EthObject = { ethereum: keyPairObject };
      

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, EthObject);

        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('ethereum 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));

        return keyPairObject;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
