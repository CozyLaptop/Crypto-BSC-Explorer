//Checks if metamask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    console.log('MetaMask is not installed, please install and try again.')
}
//Instantiate Web3.js
let web3;
try {
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    console.log("Successfully loaded Web3.js");
}catch (e) {
    console.log("Could not instantiate Web3.js");
}
var coinGeckoID;
//On click of connect MetaMask button
async function login(){
    //Will prompt user to login via metamask
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    //When user successfully logs in via Metamask
    const account = accounts[0];
    document.getElementById("connect-to-wallet").style.display = "none";
    document.getElementById("wallet-address-div").style.display = "block";
    document.getElementById("wallet-address-top").innerText = (formatWalletAddress(account));
    var chainId = await web3.eth.net.getId();
    var chainString = getChain(chainId);
    var balanceInCrypto = await web3.eth.getBalance(account).then(bal=> {
        balanceInCrypto = web3.utils.fromWei(bal, "ether");
    }).then(()=>{
        document.getElementById("resultBalances").innerText = `${balanceInCrypto} ${chainString}`;
        getBalanceInUSD(balanceInCrypto);
    });
    document.getElementById("balance").style.display = "block";
}
function getChain(chainID){
    //ETH chain id = 1
    //BSC chain id = 56
    //MATIC chain id = 137
    if (chainID === 1){
        coinGeckoID = "ethereum";
        return "ETH";
    }
    if (chainID === 56){
        coinGeckoID = "binancecoin";
        return "BNB";
    }
    if (chainID === 137){
        coinGeckoID = "matic-network";
        return "MATIC";
    }
}

function getBalanceInUSD(balanceInCrypto) {
    fetch("https://api.coingecko.com/api/v3/" + "/coins/" + coinGeckoID).then(response => {
        response.json().then(coin => {
            var currentPrice = parseFloat(coin.market_data.current_price.usd);
            parseFloat(balanceInCrypto)
            document.getElementById("balanceInUSD").innerText = `$${(currentPrice * balanceInCrypto).toFixed(2)}`;
        });
    });
}
function formatWalletAddress(account){
    return (account.substring(0, 5)) + "......." + (account.slice(-5));
}
