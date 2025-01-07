const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultDiv = document.getElementById("results-div");
const numberRegex = /^1?(\s+)?(([(][0-9]{3}[)])|([0-9]{3}))[-\s]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

const isValid = (number) => numberRegex.test(number);

const checkNumber = () =>{
  const usNumber = userInput.value;

  if(usNumber === ""){
    alert("Please provide a phone number");
    return;
  }
  resultDiv.innerHTML += `<p>${isValid(usNumber) ? "Valid US number: " : "Invalid US number: "}
  ${usNumber}</p>`;
};

checkButton.addEventListener("click", checkNumber);

clearButton.addEventListener("click", ()=>{
  resultDiv.innerHTML = "";
})