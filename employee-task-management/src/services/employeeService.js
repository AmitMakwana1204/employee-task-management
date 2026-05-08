import api from "./api";

// Get Employees
export const getEmployees = async () => {

  const response = await api.get(
    "/employees"
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