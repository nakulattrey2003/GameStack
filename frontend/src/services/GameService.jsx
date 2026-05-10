import axios from "axios";

const BASE_URL = "http://localhost:8080/games";

// GET
export const getGames = () => {
  return axios.get(BASE_URL);
};

// CREATE
export const createGame = (game) => {
  return axios.post(BASE_URL, game);
};

// UPDATE
export const updateGame = (id, game) => {
  return axios.put(`${BASE_URL}?id=${id}`, game);
};

// DELETE
export const deleteGame = (id) => {
  return axios.delete(`${BASE_URL}?id=${id}`);
};
