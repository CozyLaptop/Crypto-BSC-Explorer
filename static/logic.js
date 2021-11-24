Moralis.initialize("cP60P21nvE7YOkUDdMoGylPkhyYUX2auxmJ8nIN8"); //Application ID
Moralis.serverURL="https://rklgwlv8hboz.usemoralis.com:2053/server"; //Server URL
async function login(){
    Moralis.Web3.authenticate().then(function (user){
        user.set("name", document.getElementById('username').value);
        user.set("email", document.getElementById('email').value);
        user.save();
        deactivateControls();
        populate();
    });
}

function deactivateControls(){
    document.getElementById("login").setAttribute("disabled", null);
    document.getElementById("username").setAttribute("disabled", null);
    document.getElementById("email").setAttribute("disabled", null);
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