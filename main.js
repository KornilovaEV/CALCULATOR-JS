const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";


//разбивает строку на числа и операторы
function tokenize(expression) {
  // Используем регулярное выражение для разделения чисел и операторов
  let tokens = expression.match(/-?\d+(?:\.\d+)?|\D+/g);
  // Преобразуем числа в их числовой эквивалент
  return tokens.map(token => {
      const number = parseFloat(token);
      return isNaN(number) ? token : number;
  });
}

//проверка числа на плавающую точку
function isValidNumber(inputString) {
  // Удаляем начальные и конечные пробелы
  inputString = inputString.trim();
  // Проверяем, есть ли хотя бы одна точка
  const hasDot = inputString.includes('.');
  // Если точки нет, проверяем, является ли строка числом без точки
  if (!hasDot) {
      return !isNaN(parseFloat(inputString));
  }
  // Если точка есть, проверим, что она всего одна и стоит между цифрами
  const parts = inputString.split('.');
  if (parts.length !== 2) {
      return false;
  }
  // Обе части должны быть числами
  for (let part of parts) {
      if (part === '' || isNaN(parseFloat(part))) {
          return false;
      }
  }

  return true;
}


function evaluateExpression(expression) {
  try {
      const fn = new Function('return ' + expression);
      return fn();
  } catch (error) {
      console.error(`Ошибка при выполнении выражения: ${error.message}`);
      return NaN;
  }
}


const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    //If output has '%', replace with '/100' before evaluating.
    output = evaluateExpression(output.replace("%", "/100")); 

  } 
  //!!!!!!!!!!!!!!!!!!!!!!!!!!кривая логика, на второе число идет правило уже как для первого нельзя!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

  
  //!!!!!!!!!!!!!!!!!!!!!!!!!!кривая логика, два иррациональных нельзя!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
    output += btnValue;
  }
  display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});