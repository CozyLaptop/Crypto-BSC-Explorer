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
}
function formatWalletAddress(account){
    return (account.substring(0, 5)) + "......." + (account.slice(-5));
}
function deactivateControls(){
    document.getElementById("connect-to-wallet").style.display = "none";
}
async function populate(){
    const balanaces = await Moralis.Web3API.account.getTokenBalances({chain: chainToQuery}).then(buildTableBalances);
}
function buildTableBalances(){
    document.getElementById("resultBalances").innerHTML = `<table class="table table-dark table-striped" id="balancesTable">
                                                                    </table>`;
    const table = document.getElementById("balancesTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Token</th>
                                <th>Symbol</th>
                                <th>Balance</th>
                            </tr>
                        </thead>`;
    for(let i = 0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].symbol}</td>
                        <td>${data[i].balance/10**18}</td>
                    </tr>`
        table.innerHTML += row;
    }
}