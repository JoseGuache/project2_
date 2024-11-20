document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch income data
    const incomeResponse = await fetch('/api/income');
    const incomeData = await incomeResponse.json();

    // Process data for the chart
    const dates = incomeData.map(income => new Date(income.date).toLocaleDateString());
    const amounts = incomeData.map(income => income.amount);

    // Create the chart
    const ctx = document.getElementById('transactionChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Income',
          data: amounts,
          borderColor: 'rgb(34, 197, 94)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$ ' + value;
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}); 