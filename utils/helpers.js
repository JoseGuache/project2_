module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
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
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  }
};
