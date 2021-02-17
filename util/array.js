export const updateArrayItem = (array, updatedItem, key = 'ID') => {
  if (!array) {
    return array;
  }

  return array?.map((item) =>
    item[key] === updatedItem[key] ? updatedItem : item,
  );
};

export const removeArrayItem = (array, deletedItem, key = 'ID') => {
  if (!array) {
    return array;
  }

  return array.filter((item) => item[key] !== deletedItem[key]);
};
