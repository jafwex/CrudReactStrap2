import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/students";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // tofetch students frm api on page load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []); // Empty dependency array means it runs only once on mount

  // Optimized functions
  const handleAddStudent = useCallback(async (newStudent) => {
    try {
      const addedStudent = await addStudent(newStudent);
      setStudents((prev) => [...prev, addedStudent]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }, []);

  const handleUpdateStudent = useCallback(async (id, updatedData) => {
    try {
      const updatedStudent = await updateStudent(id, updatedData);
      setStudents((prev) =>
        prev.map((student) => (student.id === id ? updatedStudent : student))
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }, []);

  const handleDeleteStudent = useCallback(async (id) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }, []);

  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      students,
      handleAddStudent,
      handleUpdateStudent,
      handleDeleteStudent,
    }),
    [students, handleAddStudent, handleUpdateStudent, handleDeleteStudent]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
