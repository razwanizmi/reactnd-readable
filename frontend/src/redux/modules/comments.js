const ADD_COMMENT = "ADD_COMMENT";
const ADD_COMMENTS = "ADD_COMMENTS";
const UPVOTE_COMMENT = "UPVOTE_COMMENT";
const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";

const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  };
};

const addComments = comments => {
  return {
    type: ADD_COMMENTS,
    comments
  };
};

const upVoteComment = commentId => {
  return {
    type: UPVOTE_COMMENT,
    commentId
  };
};

const downVoteComment = commentId => {
  return {
    type: DOWNVOTE_COMMENT,
    commentId
  };
};

const removeComment = commentId => {
  return {
    type: REMOVE_COMMENT,
    commentId
  };
};

const comments = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case ADD_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case UPVOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore: state[action.commentId].voteScore + 1
        }
      };
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore: state[action.commentId].voteScore - 1
        }
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        [action.commentId]: undefined
      };
    default:
      return state;
  }
};

export default comments;
