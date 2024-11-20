const expenseFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#expense-name').value.trim();
  const amount = document.querySelector('#expense-amount').value.trim();
  const date = document.querySelector('#expense-date').value;

  if (name && amount && date) {
    try {
      const response = await fetch('/api/expense', {
        method: 'POST',
        body: JSON.stringify({ name, amount, date }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add expense. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding expense. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
};

document
  .querySelector('.expense-form')
  .addEventListener('submit', expenseFormHandler);

// Set default date to today
document.querySelector('#expense-date').valueAsDate = new Date(); 