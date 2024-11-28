const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");


// Converts arabic to Roman using Recursion
const arabicToRoman = (input) =>{
    if(input >= 1000){return "M"  + arabicToRoman(input - 1000);}
    if(input >= 900) {return "CM" + arabicToRoman(input - 900);}
    if(input >= 500) {return "D"  + arabicToRoman(input - 500);}
    if(input >= 400) {return "CD" + arabicToRoman(input - 400);}
    if(input >= 100) {return "C"  + arabicToRoman(input - 100);}
    if(input >=  90) {return "XC" + arabicToRoman(input - 90);}
    if(input >=  50) {return "L"  + arabicToRoman(input - 50);}
    if(input >=  40) {return "XL" + arabicToRoman(input - 40);}
    if(input >=  10) {return "X"  + arabicToRoman(input - 10);}
    if(input >=   9) {return "IX" + arabicToRoman(input - 9);}
    if(input >=   5) {return "V"  + arabicToRoman(input - 5);}
    if(input >=   4) {return "IV" + arabicToRoman(input - 4);}
    if(input >=   3) {return "I"  + arabicToRoman(input - 1);}
    if(input >=   1) {return "I"  + arabicToRoman(input - 1);} 
    return "";
};

/*Here will check if the number that the users inputs is greater than 0 
and smaller than 4000, if not display message accordindly. */
const checkInputNumber = ()=>{
    const inputNumber = parseInt(number.value);

    output.classList.remove("hidden");
    output.classList.remove("errormsg");
    console.log(inputNumber);
    if(inputNumber <= 0){
        output.textContent = "Please enter a number greater than or equal to 1";
        output.classList.add("errormsg");
        return;
    } else if(isNaN(inputNumber)){
        output.textContent = "Please enter a valid number";
        output.classList.add("errormsg");
        return;
    } else if(inputNumber >= 4000){
        output.textContent = "Please enter a number less than or equal to 3999";
        output.classList.add("errormsg");
        return;
    }
    output.textContent = arabicToRoman(inputNumber);
};

convertBtn.addEventListener("click", checkInputNumber);

number.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
       checkInputNumber();
    }
});
