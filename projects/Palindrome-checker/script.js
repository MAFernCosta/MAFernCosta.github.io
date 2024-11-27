const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultBox = document.getElementById("result");

checkButton.addEventListener("click", checkPalindrome);

//Eventlistener to trigger if you hit enter key
textInput.addEventListener("keypress",function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkButton.click();
  }
});


function checkPalindrome (){
  const userText = textInput.value;
  if(userText === "") {
    alert("Please input a value");
    return;
  }
  //Here i will clean the userInput with the cleanInputString function and receive an array.
  const userTextClean = cleanInputString(userText);
  //reverse the input text
  const userTextCleanReversed = userTextClean.toReversed();
  console.log(isEqual(userTextClean, userTextCleanReversed));
  resultBox.innerText = `${userText} ${isEqual(userTextClean, userTextCleanReversed) ? "is " : " is not "} a palindrome`;
}

//This function will just keep the letters and numbers and return the string in array
function cleanInputString(str){
  const regex = /[a-zA-Z0-9]/g;
  return str.match(regex);
}

const isEqual = (str1, str2) =>{
  for(let i = 0; i < str1.length; i++){
    if(str1[i].toLowerCase() !== str2[i].toLowerCase()){
      return false;
    } 
  }
  return true;
};