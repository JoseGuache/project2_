const incomeFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#income-name').value.trim();
  const amount = document.querySelector('#income-amount').value.trim();
  const date = document.querySelector('#income-date').value;

  if (name && amount && date) {
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        body: JSON.stringify({ name, amount, date }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add income. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding income. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
};

document
  .querySelector('.income-form')
  .addEventListener('submit', incomeFormHandler);

// Set default date to today
document.querySelector('#income-date').valueAsDate = new Date(); 
