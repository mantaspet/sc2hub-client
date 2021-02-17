export const updateArrayItem = (array, updatedItem, key = 'ID') =>
  array.map((item) => (item[key] === updatedItem[key] ? updatedItem : item));

export const removeArrayItem = (array, deletedItem, key = 'ID') =>
  array.filter((item) => item[key] !== deletedItem[key]);
