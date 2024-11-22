module.exports = {
  format_date: (date) => {
    return new Date(date).toLocaleDateString();
  },
  firstChar: (str) => {
    if (str && typeof str === 'string') {
      return str.charAt(0).toUpperCase();
    }
    return '';
  },
  eq: (a, b) => {
    return a === b;
  },
  lt: (a, b) => {
    return parseFloat(a) < parseFloat(b);
  },
  format_amount: (amount) => {
    return amount.toFixed(2);
  },
  getCurrentYear: () => {
    return new Date().getFullYear();
  }
};
