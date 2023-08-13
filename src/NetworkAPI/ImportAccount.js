export async function ImportNearAccount(seedPhrase) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/near/importAccount?seedPhrase=${seedPhrase}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('import near data :', data);
        //  import 시키고 storage에 넣기
        const implicitAccountId = data.implicitAccountId;
        const privateKey= data.privateKey;
        const publicKey= data.publicKey;
        const keyPairObject = { publicKey: publicKey, privateKey: privateKey, implicitAccountId: implicitAccountId};
        const NearObject = { near : keyPairObject };

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, NearObject);
        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('near 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));


        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function ImportEthAccount(privateKey) {
    try {
        // Data to send in the request body
        const privateKeyObject = { privateKey };

        const response = await fetch('https://theblockbuster.org/wallet-server/ethereum/importAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(privateKeyObject), // privateKey를 JSON 형태로 변환하여 요청 본문에 담음
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        //  import 시키고 storage에 넣기
        const publicKey = data.address;
        const keyPairObject = { publicKey: publicKey, privateKey: privateKey };
        const EthObject = { ethereum: keyPairObject };

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, EthObject);
        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('ethereum 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function ImportBitAccount(privateKey) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/bitcoin/importAccount?privateKey=${privateKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        //  import 시키고 storage에 넣기
        const publicKey = data.address;
        const keyPairObject = { publicKey: publicKey, privateKey: privateKey };
        const BitTestObject = { bitTest: keyPairObject };

        const storageKey = localStorage.getItem('hasedPW');
        const storageValue = localStorage.getItem(storageKey);
        const parsedValue = JSON.parse(storageValue);

        Object.assign(parsedValue, BitTestObject);
        localStorage.setItem(storageKey, JSON.stringify(parsedValue));
        //console.log('bitMain 네트워크 계정 생성 후 storage:', localStorage.getItem(storageKey));

        return keyPairObject;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

