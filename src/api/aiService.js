import axios from "axios";

const AI_API = axios.create({
  baseURL: import.meta.env.VITE_AI_API_URL || "http://localhost:8000",
});

export const predictSignSentence = (frames, options = {}) =>
  AI_API.post("/predict_sentence", {
    frames,
    step: options.step ?? 5,
    min_confidence: options.minConfidence ?? 45,
  });

export const predictSignWord = (frames) =>
  AI_API.post("/predict", { frames });
