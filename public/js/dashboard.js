document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch income data
    const incomeResponse = await fetch('/api/income');
    const incomeData = await incomeResponse.json();

    // Fetch expense data
    const expenseResponse = await fetch('/api/expense');
    const expenseData = await expenseResponse.json();

    // Combine and sort all transactions by date
    const allTransactions = [
      ...incomeData.map(income => ({
        date: new Date(income.date),
        amount: parseFloat(income.amount),
        type: 'income'
      })),
      ...expenseData.map(expense => ({
        date: new Date(expense.date),
        amount: parseFloat(expense.amount),
        type: 'expense'
      }))
    ].sort((a, b) => a.date - b.date);

    // Get unique dates for labels
    const dates = [...new Set(allTransactions.map(t => t.date.toLocaleDateString()))];

    // Process data for each type
    const incomeAmounts = dates.map(date => {
      const income = allTransactions
        .filter(t => t.type === 'income' && t.date.toLocaleDateString() === date)
        .reduce((sum, t) => sum + t.amount, 0);
      return income;
    });

    const expenseAmounts = dates.map(date => {
      const expense = allTransactions
        .filter(t => t.type === 'expense' && t.date.toLocaleDateString() === date)
        .reduce((sum, t) => sum + t.amount, 0);
      return expense;
    });

    // Create the chart
    const ctx = document.getElementById('transactionChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Income',
            data: incomeAmounts,
            borderColor: 'rgb(34, 197, 94)', // green
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.1,
            fill: true
          },
          {
            label: 'Expenses',
            data: expenseAmounts,
            borderColor: 'rgb(239, 68, 68)', // red
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$ ' + value;
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $ ${context.parsed.y}`;
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