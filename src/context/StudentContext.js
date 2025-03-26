import { createContext, useState, useEffect, useCallback } from "react";
import { fetchAllStudents, addStudent, updateStudent, deleteStudent } from "../services/students";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetchAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = async (newStudent) => {
    await addStudent(newStudent);
    fetchStudents();
  };

  const handleUpdateStudent = async (id, updatedStudent) => {
    await updateStudent(id, updatedStudent);
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <StudentContext.Provider value={{ students, fetchStudents, handleAddStudent, handleUpdateStudent, handleDeleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
