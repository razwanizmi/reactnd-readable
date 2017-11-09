import { fetchPosts, createPost, createPostVote } from "../../helpers/api";
import { formatArrayToObject } from "../../helpers/utils";

const ADD_POST = "ADD_POST";
const ADD_POSTS = "ADD_POSTS";
const UPVOTE_POST = "UPVOTE_POST";
const DOWNVOTE_POST = "DOWNVOTE_POST";
const REMOVE_POST = "REMOVE_POST";

const addPost = post => {
  return {
    type: ADD_POST,
    post
  };
};

const addPosts = posts => {
  return {
    type: ADD_POSTS,
    posts
  };
};

const upVotePost = postId => {
  return {
    type: UPVOTE_POST,
    postId
  };
};

const downVotePost = postId => {
  return {
    type: DOWNVOTE_POST,
    postId
  };
};

const removePost = postId => {
  return {
    type: REMOVE_POST,
    postId
  };
};

export const fetchAndHandlePosts = () => {
  return dispatch => {
    fetchPosts()
      .then(posts => formatArrayToObject(posts))
      .then(formattedPosts => dispatch(addPosts(formattedPosts)));
  };
};

export const createAndHandlePost = (post, callback) => {
  return dispatch => {
    createPost(post)
      .then(postWithId => dispatch(addPost(postWithId)))
      .then(() => callback());
  };
};

export const createAndHandlePostVote = (postId, option) => {
  return dispatch => {
    createPostVote(postId, option).then(() => {
      if (option === "upVote") {
        dispatch(upVotePost(postId));
      }
      if (option === "downVote") {
        dispatch(downVotePost(postId));
      }
    });
  };
};

const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case ADD_POSTS:
      return {
        ...state,
        ...action.posts
      };
    case UPVOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore: state[action.postId].voteScore + 1
        }
      };
    case DOWNVOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore: state[action.postId].voteScore - 1
        }
      };
    case REMOVE_POST:
      return {
        ...state,
        [action.postId]: undefined
      };
    default:
      return state;
  }
};

export default posts;
