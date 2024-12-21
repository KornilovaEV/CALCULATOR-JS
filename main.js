const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";


function evaluateExpression(expression) {
  try {
      const fn = new Function('return ' + expression);
      const result = fn();
      return Number((result).toFixed(10));
  } catch (error) {
      console.error(`Ошибка при выполнении выражения: ${error.message}`);
      return NaN;
  }
}




const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    //If output has '%', replace with '/100' before evaluating.
    // output = parseFloat(output);

      output = evaluateExpression(output.replace("%", "/100")); 

  } 
  
  else if (btnValue === "0") {
    if(output !== "0"){
      output += btnValue;
    }
  }
  else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    //If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } 
  else if(btnValue === "."){  
 
    if(output.toString() === ""){
      output = '0';
      output += btnValue;
    }


    if(!output.toString().includes(".") )
    {
    output += btnValue;
  }
    
  } else {
    //If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    else if (output === "0" && btnValue && !specialChars.includes(btnValue)){
      output = '';
    }
    
    output += btnValue;
  }
  display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});