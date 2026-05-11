import api from "./api";

// Get Employees
export const getEmployees = async (params = {}) => {

  const response = await api.get(
    "/employees",
    { params }
  );

  return response.data;
};

// Get Single Employee by ID
export const getEmployeeById = async (id) => {

  const response = await api.get(
    `/employees/${id}`
  );

  return response.data;
};

// Add Employee
export const addEmployee = async (data) => {

  const response = await api.post(
    "/employees",
    data
  );

  return response.data;
};

// Update Employee
export const updateEmployee = async (
  id,
  data
) => {

  const response = await api.put(
    `/employees/${id}`,
    data
  );

  return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {

  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
};