import axios from "../config/axiosClient";

export const getStudents = async () => {
  const response = await axios.get("/students");
  return response.data;
};

export const addStudent = async (student) => {
  const response = await axios.post("/students", student);
  return response.data;
};

export const updateStudent = async (id, updatedStudent) => {
  const response = await axios.put(`/students/${id}`, updatedStudent);
  return response.data;
};

export const deleteStudent = async (id) => {
  await axios.delete(`/students/${id}`);
};
