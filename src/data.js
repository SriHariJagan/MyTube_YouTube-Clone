export const API_Key = "AIzaSyAZMNgMw36JlFQBE59UaMFtFRxha-bYzCw";

export const formatViews = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'B'; // Billions
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M'; // Millions
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K'; // Thousands
    }
    return num; // Less than 1K, return the number as is
  };