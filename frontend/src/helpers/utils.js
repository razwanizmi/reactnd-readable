export const formatCategories = categories => {
  return categories.reduce((accumulator, category) => {
    accumulator[category.path] =
      category.name[0].toUpperCase() + category.name.slice(1);
    return accumulator;
  }, {});
};
