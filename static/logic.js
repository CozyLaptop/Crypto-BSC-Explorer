//Checks if metamask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    console.log('MetaMask is not installed, please install and try again.')
}
let web3;
try {
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    console.log("Successfully loaded Web3.js");
}catch (e) {
    console.log("Could not instantiate Web3.js");
}
async function login(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.getElementById("connect-to-wallet").style.display = "none";
    document.getElementById("wallet-address-div").style.display = "block";
    document.getElementById("wallet-address-top").innerText = (formatWalletAddress(account));
    var chainId = await getChain();
    // console.log(chainId)
    var balance = await web3.eth.getBalance(account).then(bal=> {
        balance = web3.utils.fromWei(bal, "ether");
        document.getElementById("balance").style.display = "block";
        document.getElementById("resultBalances").innerText = `${balance} ${chainId}`;
    });

    //ETH chain id = 1
    //BSC chain id = 56
}
async function getChain(){
    return await web3.eth.net.getId().then(chainID=>{
        if (chainID === 1){
            return "ETH";
        }
        if (chainID === 56){
            return "BNB";
        }
    });
}
function formatWalletAddress(account){
    return (account.substring(0, 5)) + "......." + (account.slice(-5));
}