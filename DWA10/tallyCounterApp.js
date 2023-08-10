// Get HTMLelements from DOM using IDs
const counterElement = document.getElementById('tallyCounter');
const additionBtn = document.getElementById('additionBtn');
const subtractionBtn = document.getElementById('subtractionBtn');
const resetBtn = document.getElementById('resetBtn');
const confirmationMsg = document.getElementById('confirmationMsg');

// Initial counter value
let counterValue = 0;

confirmationMsg.open = false;
// Function to update the counter display
function updateCounterDisplay() {
  counterElement.textContent = counterValue.toString();
}

// Event listener for the "Add" button
additionBtn.addEventListener('click', () => {
  counterValue += 1;
  updateCounterDisplay();
});

// Event listener for the "Subtract" button
subtractionBtn.addEventListener('click', () => {
  if (counterValue > 0) {
    counterValue -= 1;
    updateCounterDisplay();
  }
});

// Event listener for the "Reset" button
resetBtn.addEventListener('click', () => {
  if (counterValue !== 0) {
    counterValue = 0;
    updateCounterDisplay();
    
    // Show the confirmation message
    confirmationMsg.open = true;
    setTimeout(() => {
      // Hide the confirmation message after 2 seconds
      confirmationMsg.open = false;
    }, 3000);
  }
});

// Initialize the counter display
updateCounterDisplay();
