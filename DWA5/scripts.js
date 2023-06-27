
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {

  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  const trimDivident = dividend.trim() //
  const trimDivider = divider.trim() //

  if (trimDivident == "" || trimDivider == "") // User Story 4: Validation when values are missing. 
  {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
    displayError("Division not performed. Both values are required in inputs. Try again");
  }
  else if (trimDivident < 0 || trimDivider < 0) // User story 5: An invalid division should log an error in the console
  {

    result.innerHTML = "Division not performed. Invalid number provided. Try again";
    displayError("Division not performed. Invalid number provided. Try again");
  }
  else if (isNaN(trimDivident) || isNaN(trimDivider)) // User Story 6: Providing anything that is not a number should crash the program
  {
    
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
    displayError("Something critical went wrong. Please reload the page")
  }
  else {
    result.innerText = Math.floor(trimDivident / trimDivider) // User Story 3: Dividing numbers result in a decimal number. 

  }

    
    function displayError(message) {
      return console.error(new Error(message))
    }
});






