import axios from "axios";

const AI_API = axios.create({
  baseURL: import.meta.env.VITE_AI_API_URL || "http://localhost:8000",
});

export const predictSignFrames = (frames) => AI_API.post("/predict", { frames });
