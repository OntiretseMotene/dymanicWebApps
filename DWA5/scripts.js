
//User Story 1: Starting program state
//Displayes message at the bottom when code has loaded. 
const result = document.querySelector("[data-result]");
result.innertext = "No calculation performed";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

// User Story 3: Validation when values are missing. 
// Check if either or both dividend and divider inputs are empty, if so, display error message
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend === " " || divider === " ") {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
    return; //Exit the event listner
  }

  //User Story 4: An invalid division should log an error in the console
  //check if input is valid, if not display an error message.
  if (!isValidNumber(dividend) || !isValidNumber(divider)) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Invalid number provided:", dividend, divider);
    console.trace(); // Log call stack
    return; //Exit the eventlistner
  }

  // User Story 5: Providing anything that is not a number should crash the program
  // Check if the inputs are valid numbers, if not, display an error message
  if (!isNumeric(dividend) || !isNumeric(divider)) {
    document.body.innerHTML = "Something critical went wrong. Please reload the page";
    console.error ("Invalid input provided:", dividend, divider);
    return //Exit the event listner
  }

  // User Story 2: Dividing numbers result in a whole number
  // Divide the number and display the result at the bottom
  const dividendValue = parseFloat(dividend);
  const dividerValue = parseFloat(divider);

  const qoutient = dividendValue / dividerValue;

  if (Number.isInteger(qoutient)) {
    result.innerText = qoutient;
  } else {

  // User Story 3: Dividing numbers result in a decimal number
  // Display the whole number part of the result without decimals
    result.innerText = Math.floor(qoutient); 
  }

});

  // Function helps to check if a value is a valid number
  function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
  }

  // Function helps to check if value is numeric
  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }

form.addEventListener("submit", )