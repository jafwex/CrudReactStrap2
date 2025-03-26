import { createContext, useState, useEffect } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/students";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (student) => {
    await addStudent(student);
    fetchStudents();
  };

  const handleUpdateStudent = async (id, student) => {
    await updateStudent(id, student);
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
