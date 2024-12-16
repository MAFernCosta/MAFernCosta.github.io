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
//[["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
//[["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const cashElement = document.getElementById("cash");
const changeDrawerElement = document.getElementById("change-drawer");
const changeDueElement = document.getElementById("change-due");
const payBtn = document.getElementById("purchase-btn");
const priceElement = document.getElementById("price");
priceElement.textContent = price;
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


class Money{
   constructor(currecyUnit, value, name, amount) {
    this.currecyUnit = currecyUnit;
    this.value = value;
    this.name = name;
    this.amount = amount;
  }
}


class CashRegister{
  constructor(money){
    this.cashInDrawer = money;
    this.currChar = "$";
  }
  showCashInDrawer(){
    let result = "";
    this.cashInDrawer.map(el => result +=`${el.currecyUnit}: ${this.currChar}${el.amount} </br>`)
    return result;
  }
  totalCashInDrawer(){
    return Math.round((this.cashInDrawer.map((curr) => curr.amount).reduce((total, currentValue) => total + currentValue ,0)) * 100) / 100;
  }
  makeChange(cash, price){
    let changeValue = Math.round((cash - price) * 100) / 100;
    let result = this.checkTransaction(changeValue, price);
    let change = {};
    if(result){
      return result;
    }
    //console.log(changeValue); //DEBUG
    while (changeValue > 0){ 

      //console.log("Change" + changeValue); //DEBUG
      this.cashInDrawer.toReversed().find((item) => {
        if(changeValue >= item.value && item.amount > 0){
          change[item.name] = change[item.name] ? Math.round((change[item.name] + item.value) * 100) / 100 : item.value;
          changeValue = Math.round((changeValue - item.value) * 100) / 100;
          item.amount = Math.round((item.amount - item.value) * 100) / 100;     
          //console.log(changeValue, item.amount, item.value, item.name); //DEBUG
          return true;
        } 
      });
    }

    result = `Status: ${this.totalCashInDrawer() <= 0 ? "CLOSED " : "OPEN "}`;
    if(cash !== price){
      for(var key in change){
        result += `${key}: ${this.currChar}${change[key]} `;
      }
    } else {
      result = "No change due - customer paid with exact cash";
    }
    return result;   
  }
  checkTransaction(change, price){
    const drawerCash = this.cashInDrawer.toReversed().filter((item) => change >= item.value).reduce((acc, currVal) => acc + currVal.amount ,0);
    //this.cashInDrawer.toReversed().filter((item) => change >= item.value).forEach((el) => console.log(`${el.name} : ${el.amount}`));
    //console.log(`drawerCash: ${drawerCash}, change: ${change}`); //debug
    if (drawerCash < change){
      return "Status: INSUFFICIENT_FUNDS";
    }
  }
}

const cashregister = new CashRegister(cid.map((item, index) => new Money(curr[index][0], curr[index][1], item[0], item[1])));

changeDrawerElement.innerHTML = cashregister.showCashInDrawer();
totalCashInDrawerElement.textContent = cashregister.totalCashInDrawer();


payBtn.addEventListener("click", ()=>{
  
  if(cashElement.value){
    const payment = Number(cashElement.value);
    if(payment < price){
      alert("Customer does not have enough money to purchase the item")
      return;
    } else {
      changeDueElement.textContent = cashregister.makeChange(payment, price);
      changeDrawerElement.innerHTML = cashregister.showCashInDrawer();
      totalCashInDrawerElement.textContent = cashregister.totalCashInDrawer();
    }
  }
})

//Eventlistener to trigger if you hit enter key
cashElement.addEventListener("keypress",function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    payBtn.click();
  }
});
