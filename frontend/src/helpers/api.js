import axios from "axios";

const api = "http://localhost:3001";

const generateId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};

let token = localStorage.token;
if (!token) {
  token = localStorage.token = generateId();
}

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const fetchCategories = () => {
  return axios
    .get(`${api}/categories`, { headers })
    .then(response => response.data.categories);
};

export const fetchPosts = () => {
  return axios.get(`${api}/posts`, { headers }).then(response => response.data);
};

export const fetchPost = postId => {
  return axios
    .get(`${api}/posts/${postId}`, { headers })
    .then(response => response.data);
};

export const createPost = post => {
  const id = generateId();
  const timestamp = Date.now();

  return axios
    .post(`${api}/posts`, { ...post, timestamp, id }, { headers })
    .then(response => response.data);
};

export const updatePost = post => {
  const timestamp = Date.now();

  return axios
    .put(`${api}/posts/${post.id}`, { ...post, timestamp }, { headers })
    .then(response => response.data);
};

export const deletePost = postId => {
  return axios
    .delete(`${api}/posts/${postId}`, { headers })
    .then(response => response.data);
};

export const createPostVote = (postId, option) => {
  return axios
    .post(`${api}/posts/${postId}`, { option }, { headers })
    .then(response => response.data);
};

export const fetchComments = postId => {
  return axios
    .get(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.data);
};

export const createComment = comment => {
  const id = generateId();
  const timestamp = Date.now();

  return axios
    .post(`${api}/comments`, { ...comment, timestamp, id }, { headers })
    .then(response => response.data);
};

export const deleteComment = commentId => {
  return axios
    .delete(`${api}/comments/${commentId}`, { headers })
    .then(response => response.data);
};

export const createCommentVote = (commentId, option) => {
  return axios
    .post(`${api}/comments/${commentId}`, { option }, { headers })
    .then(response => response.data);
};
