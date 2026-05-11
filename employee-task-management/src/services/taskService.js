import api from "./api";

// Get All Tasks (supports query params: search, status, priority)
export const getTasks = async (params = {}) => {

  const response = await api.get("/tasks", { params });

  return response.data;
};

// Get Single Task by ID
export const getTaskById = async (id) => {

  const response = await api.get(`/tasks/${id}`);

  return response.data;
};

// Get Dashboard Stats
export const getDashboardStats = async () => {

  const response = await api.get("/tasks/dashboard/stats");

  return response.data;
};

// Add Task
export const addTask = async (data) => {

  const response = await api.post(
    "/tasks",
    data
  );

  return response.data;
};

// Update Task
export const updateTask = async (id, data) => {

  const response = await api.put(
    `/tasks/${id}`,
    data
  );

  return response.data;
};

// Delete Task
export const deleteTask = async (id) => {

  const response = await api.delete(
    `/tasks/${id}`
  );

  return response.data;
};