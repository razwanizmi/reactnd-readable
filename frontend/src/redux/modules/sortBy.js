const SORT_DATE_DESC = "SORT_DATE_DESC";
const SORT_DATE_ASC = "SORT_DATE_ASC";
const SORT_LIKES_DESC = "SORT_LIKES_DESC";
const SORT_LIKES_ASC = "SORT_LIKES_DESC";

const sortDateDesc = () => {
  return {
    type: SORT_DATE_DESC
  };
};

const sortDateAsc = () => {
  return {
    type: SORT_DATE_ASC
  };
};

const sortLikesDesc = () => {
  return {
    type: SORT_LIKES_DESC
  };
};

const sortLikesAsc = () => {
  return {
    type: SORT_LIKES_ASC
  };
};

const sortBy = (state = "dateDesc", action) => {
  switch (action.type) {
    case SORT_DATE_DESC:
      return "dateDesc";
    case SORT_DATE_ASC:
      return "dateAsc";
    case SORT_LIKES_DESC:
      return "likesDesc";
    case SORT_LIKES_ASC:
      return "likesAsc";
    default:
      return state;
  }
};

export default sortBy;
