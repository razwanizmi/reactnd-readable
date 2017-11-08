import axios from "axios";

const api = "http://localhost:3001";

const generateId = () => {
  Math.random()
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

export const getCategories = () => {
  return axios
    .get(`${api}/categories`, { headers })
    .then(response => response.data.categories);
};

export const getPosts = () => {
  return axios.get(`${api}/posts`, { headers }).then(response => response.data);
};
