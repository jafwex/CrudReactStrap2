import React, { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { StudentContext } from "../context/StudentContext";
import { deleteStudent } from "../services/students";

const DeleteConfirmation = ({ id, onClose }) => {
  const { fetchStudents } = useContext(StudentContext);

  const handleDelete = async () => {
    await deleteStudent(id);
    await fetchStudents(); 
    onClose();
  };

  return (
    <Modal isOpen toggle={onClose}>
      <ModalHeader toggle={onClose}>Confirm Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete this student?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>Delete</Button>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmation;
