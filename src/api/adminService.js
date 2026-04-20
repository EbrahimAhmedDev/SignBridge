import API from "./authService";

// Stats
export const getStats = () => API.get("/admin/stats");

// Modules
export const getAllModules = () => API.get("/admin/modules");

export const createModule = (formData) =>
  API.post("/admin/modules", formData);

export const updateModule = (id, formData) =>
  API.put(`/admin/modules/${id}`, formData);

export const deleteModule = (id) => API.delete(`/admin/modules/${id}`);

// Sign Items
export const addSignItem = (moduleId, formData) =>
  API.post(`/admin/modules/${moduleId}/items`, formData);

export const deleteSignItem = (moduleId, itemId) =>
  API.delete(`/admin/modules/${moduleId}/items/${itemId}`);

// Users
export const getAllUsers = () => API.get("/admin/users");
