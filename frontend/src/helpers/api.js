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

export const createPost = post => {
  const id = generateId();
  const timestamp = Date.now();

  return axios
    .post(`${api}/posts`, { ...post, timestamp, id }, { headers })
    .then(response => response.data);
};

export const createPostVote = (postId, option) => {
  return axios
    .post(`${api}/posts/${postId}`, { option }, { headers })
    .then(response => response.data);
};
