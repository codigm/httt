import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Tournaments
export const getTournaments = () => API.get("/tournaments");
export const createTournament = (tournament) =>
  API.post("/tournaments", tournament);

// Players
export const registerPlayer = (player) => API.post("/players", player);

export default API;
