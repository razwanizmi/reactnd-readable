const ADD_CATEGORIES = "ADD_CATEGORIES";

const addCategories = categories => {
  return {
    type: ADD_CATEGORIES,
    categories
  };
};

const categories = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        ...action.categories
      };
    default:
      return state;
  }
};

export default categories;
