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
const payBtn = document.getElementById("pay-button");
const priceElement = document.getElementById("price");
priceElement.textContent = price;
const totalCashInDrawerElement = document.getElementById("total-cash-in-drawer");

const curr = [
  ["Penny", 0.01],
  ["Nickel", 0.02],
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
  }
  showCashInDrawer(){
    let result = "";
    this.cashInDrawer.map(el => result +=`<li>${el.currecyUnit}: ${el.amount}</li>`)
    return result;
  }
  totalCashInDrawer(){
    return this.cashInDrawer.map((curr) => curr.amount).reduce((total, currentValue) => total + currentValue ,0);
  }
  makeChange(cash, price){
    let changeValue = (cash - price).toFixed(2);
    console.log(changeValue); //DEBUG
    let change = {};
    while (changeValue > 0){ 
      this.cashInDrawer.toReversed().find((item) => {
        if(changeValue >= item.value){
          console.log(changeValue, item.value); //DEBUG
          change[item.currecyUnit] = change[item.currecyUnit] ? change[item.currecyUnit] + item.value : item.value;
          changeValue = (changeValue - item.value).toFixed(2);
          item.amount = (item.amount - item.value).toFixed(2);       
          console.log(item.amount)   //DEBUG
          return true;
        } 
      });
    }
    let result = "<ul>";
    for(var key in change){
      result += `<li>${key}: ${change[key]}</li>`;
    }
    result += "</ul>";
    return result;
  }
}

const cashregister = new CashRegister(cid.map((item, index) => new Money(curr[index][0], curr[index][1], item[0], item[1])));

changeDrawerElement.innerHTML = cashregister.showCashInDrawer();
totalCashInDrawerElement.textContent = cashregister.totalCashInDrawer();


payBtn.addEventListener("click", ()=>{
  
  if(cashElement.value){
    const payment = parseInt(cashElement.value);
    if(payment < price){
      alert("Customer doesnt have enought money to buy the item.")
      return;
    } else if(payment > cashregister.totalCashInDrawer()){
      changeDueElement.innerHTML = "Status: INSUFFICIENT_FUNDS";
      return;
    } else {
      changeDueElement.innerHTML = cashregister.makeChange(cashElement.value, price);
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