
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  



if (dividend == "" || divider == " ") // User Story 3: Validation when values are missing. 
{
  result.innerText = "Division not performed. Both values are required in inputs. Try again";
} 
else if (dividend < 0 || divider < 0) // User story 4: An invalid division should log an error in the console
{
  
  result.innerHTML = "Division not performed. Invalid number provided. Try again";
  console.log();
} 
else if ( isNaN(dividend) || isNaN(divider) ) // User Story 5: Providing anything that is not a number should crash the program
{
  console.error (
    new Error("Something critical went wrong. Please reload the page." ));

  document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
} 
else 
{
  result.innerText = Math.floor(dividend / divider)
  
}


});




