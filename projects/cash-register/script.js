let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashElement = document.getElementById("cash");
const changeDrawerElement = document.getElementById("change-drawer");
const changeDueElement = document.getElementById("change-due");
const payBtn = document.getElementById("purchase-btn");
const priceElement = document.getElementById("price");
const totalCashInDrawerElement = document.getElementById("total-cash-in-drawer");

const curr = [
  ["Penny", 0.01],
  ["Nickel", 0.05],
  ["Dime", 0.1],
  ["Quarter", 0.25],
  ["Dollar", 1],
  ["Five Dollar", 5],
  ["Ten Dollar", 10],
  ["Twenty Dollars", 20],
  ["One Hundred Dollars", 100]
];

let cash = 0;

const listCid = () => {
    changeDrawerElement.innerHTML = "";
    cid.forEach((item) => changeDrawerElement.innerHTML += `${item[0]}: $${item[1]} <br>`);
}

const totalInCid = ()=> Math.round(cid.reduce((total, currVal) => total += currVal[1], 0) * 100) / 100;

const update = () =>{
    listCid();
    totalCashInDrawerElement.textContent = "$" + totalInCid();
}

const checkEnoughMoney = (change)=>{
    let total = 0;
    for(let i = 0; i < curr.length; i++){
        
        total = curr[i][1] <= change ? cid[i][1] + total : total; 
    }
    return Math.round(total*100)/100 >= change;
};

const cashRegisterStatus = (change) =>{
    if(change === totalInCid()){
        return "Status: CLOSED </br>";
    } else if (change < totalInCid()){
        return "Status: OPEN </br>";
    }
};

const makeChange = (price, cash) =>{
    let change = Math.round((cash - price) * 100) / 100;
    const cidcopy = cid.map(item => item.map(inneritem => inneritem));
    //console.log("->Cash: ", cash, " Change: ", change, " Price: ", price);  //DEBUG
    //console.log(cid); //debug
    let dueChange = cashRegisterStatus(change) + " ";
    if(cash < price){
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if(change === 0){
        return "No change due - customer paid with exact cash";
    }
    for(let i = curr.length-1; i >= 0; i--){
        let amount = 0;
        if(!checkEnoughMoney(change)){
            cid = [];
            cid = cidcopy.map(item => item.map(inneritem => inneritem));
            return "Status: INSUFFICIENT_FUNDS";
        }
        while(change >= curr[i][1] && cid[i][1] > 0){
            //console.log(cid[i][0],": ", cid[i][1]); //DEBUG
            change = Math.round((change - curr[i][1]) * 100) / 100;   
            amount = Math.round((curr[i][1] + amount) * 100) / 100 ;
            cid[i][1] = Math.round((cid[i][1] - curr[i][1]) * 100) / 100;               
        }
        if(amount > 0){
            dueChange += `${cid[i][0]}: $${amount} </br>`;
            //console.log(change);  //DEBUG
        }
    }
    //console.log(dueChange); //Debug
    return dueChange;
}

update();
priceElement.textContent = "$" + price;

payBtn.addEventListener("click",()=>{
    const cash = cashElement.value;
    changeDueElement.innerHTML = makeChange(price, cash);    
    update();  
})

//Eventlistener to trigger if you hit enter key
cashElement.addEventListener("keypress",function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      payBtn.click();
    }
  });