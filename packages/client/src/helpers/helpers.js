export const sortArrayDescendent = (array, first, second) => {
  const result = [...array].sort((a, b) => {
    if (second) {
      if (a[first][second] < b[first][second]) return 1;
      if (a[first][second] > b[first][second]) return -1;
    }
    if (!second) {
      if (a[first] < b[first]) return 1;
      if (a[first] > b[first]) return -1;
    }
    return 0;
  });
  return result;
};

export const sortArrayAscendent = (array, first, second) => {
  const result = [...array].sort((a, b) => {
    if (second) {
      if (a[first][second] > b[first][second]) return 1;
      if (a[first][second] < b[first][second]) return -1;
    }
    if (!second) {
      if (a[first] > b[first]) return 1;
      if (a[first] < b[first]) return -1;
    }
    return 0;
  });
  return result;
};
