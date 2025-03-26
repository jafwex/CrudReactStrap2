import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import StudentTable from "./StudentTable";  
import StudentForm from "./StudentForm";  

const Students = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSelectedStudent(null); 
  };

  const handleEdit = (student) => {
    setSelectedStudent(student); 
    setIsOpen(true);
  };

  return (
    <Container className="mt-4">
      <Button color="primary" onClick={toggleModal}>Add Student</Button>
      <StudentTable onEdit={handleEdit} />
      <StudentForm isOpen={isOpen} toggle={toggleModal} selectedStudent={selectedStudent} />
    </Container>
  );
};

export default Students;
