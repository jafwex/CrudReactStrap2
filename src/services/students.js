import axiosClient from "../config/axiosClient";


export const fetchAllStudents = async () => {
  return await axiosClient.get("/students");
};

export const addStudent = async (student) => {
  return await axiosClient.post("/students", student);
};

export const updateStudent = async (id, student) => {
  return await axiosClient.put(`/students/${id}`, student);
};

export const deleteStudent = async (id) => {
  return await axiosClient.delete(`/students/${id}`);
};
