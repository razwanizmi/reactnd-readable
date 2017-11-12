import {
  createComment,
  createCommentVote,
  fetchComment,
  fetchComments,
  deleteComment,
  updateComment
} from "../../helpers/api";
import { formatArrayToObject } from "../../helpers/utils";

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

export const fetchAndHandleComments = postId => {
  return dispatch => {
    fetchComments(postId)
      .then(comments => formatArrayToObject(comments))
      .then(formattedComments => dispatch(addComments(formattedComments)));
  };
};

export const fetchAndHandleComment = (commentId, callback) => {
  return dispatch => {
    fetchComment(commentId).then(comment => {
      dispatch(addComment(comment));
      callback(comment);
    });
  };
};

export const createAndHandleComment = (comment, callback) => {
  return dispatch => {
    createComment(comment)
      .then(comment => dispatch(addComment(comment)))
      .then(() => callback());
  };
};

export const updateAndHandleComment = (comment, callback) => {
  return dispatch => {
    updateComment(comment)
      .then(comment => dispatch(addComment(comment)))
      .then(() => dispatch(callback));
  };
};

export const deleteAndHandleComment = commentId => {
  return dispatch => {
    deleteComment(commentId).then(() => dispatch(removeComment(commentId)));
  };
};

export const createAndHandleCommentVote = (commentId, option) => {
  return dispatch => {
    createCommentVote(commentId, option).then(() => {
      if (option === "upVote") {
        dispatch(upVoteComment(commentId));
      }
      if (option === "downVote") {
        dispatch(downVoteComment(commentId));
      }
    });
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
      return Object.keys(state).reduce((accumulator, commentId) => {
        if (commentId !== action.commentId) {
          accumulator[commentId] = state[commentId];
        }
        return accumulator;
      }, {});
    default:
      return state;
  }
};

export default comments;
