const SET_SORT_BY = "SORT_SET_BY";

export const setSortBy = attribute => {
  return {
    type: SET_SORT_BY,
    attribute
  };
};

const sortBy = (state = "dateDesc", action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return action.attribute;
    default:
      return state;
  }
};

export default sortBy;
