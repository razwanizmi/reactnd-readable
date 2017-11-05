import { getCategories } from "../../helpers/api";
import { formatCategories } from "../../helpers/utils";

const ADD_CATEGORIES = "ADD_CATEGORIES";

const addCategories = categories => {
  return {
    type: ADD_CATEGORIES,
    categories
  };
};

export const getAndHandleCategories = () => {
  return dispatch => {
    getCategories()
      .then(categories => formatCategories(categories))
      .then(formattedCategories =>
        dispatch(addCategories(formattedCategories))
      );
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
