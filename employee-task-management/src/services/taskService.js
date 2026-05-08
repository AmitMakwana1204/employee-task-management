import api from "./api";

// Get All Tasks
export const getTasks = async () => {

  const response = await api.get("/tasks");

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