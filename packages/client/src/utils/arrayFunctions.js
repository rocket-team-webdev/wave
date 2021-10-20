export const uniqueValuesArray = (array) => {
  const cleanedArray = array.filter(
    (v, i, a) => a.findIndex((t) => t._id === v._id) === i,
  );
  return cleanedArray;
};
