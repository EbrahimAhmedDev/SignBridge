import API from "./authService";

export const predictSignFrames = (frames) => API.post("/ai/predict", { frames });
