import API from "./authService";

export const getAllSigns = () => API.get("/signs");

