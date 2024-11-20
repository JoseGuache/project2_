document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('transactionChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['25/02/2023', '21/02/2023', '18/01/2023', '28/01/2023'],
      datasets: [{
        label: 'Income',
        data: [1500, 8000, 1200, 6000],
        borderColor: '#48bb78',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Expenses',
        data: [300, 3000, 800, 0],
        borderColor: '#e53e3e',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#edf2f7'
          }
        },
        x: {
          grid: {
            color: '#edf2f7'
          }
        }
      }
    }
  });
}); 