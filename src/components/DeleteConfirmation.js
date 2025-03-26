import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { FaTrashAlt, FaTimes } from "react-icons/fa";

const DeleteConfirmation = ({ id, onClose }) => {
  const { handleDeleteStudent } = useContext(StudentContext);

  const handleDelete = async () => {
    await handleDeleteStudent(id);
    onClose();
  };

  return (
    <Modal isOpen toggle={onClose} centered>
      <ModalHeader toggle={onClose}>
        <FaTrashAlt /> Confirm Delete
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete this student?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>
          <FaTrashAlt /> Delete
        </Button>
        <Button color="secondary" onClick={onClose}>
          <FaTimes /> Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmation;
