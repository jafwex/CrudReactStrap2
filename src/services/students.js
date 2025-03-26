import axiosClient from "../config/axiosClient";

export const getStudents = async () => {
  const response = await axiosClient.get("/students");
  return response.data;
};

export const addStudent = async (student) => {
  const response = await axiosClient.post("/students", student);
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await axiosClient.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  await axiosClient.delete(`/students/${id}`);
};
