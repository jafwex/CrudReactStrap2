import { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";

const StudentForm = ({ isOpen, toggle, editStudent }) => {
  const { handleAddStudent, handleUpdateStudent } = useContext(StudentContext);
  const [formData, setFormData] = useState({ name: "", mobile: "", present: false });

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    } else {
      setFormData({ name: "", mobile: "", present: false });
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) {
      handleUpdateStudent(editStudent.id, formData);
    } else {
      handleAddStudent(formData);
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{editStudent ? "Edit Student" : "Add Student"}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label>Mobile</Label>
            <Input type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={formData.present} onChange={(e) => setFormData({ ...formData, present: e.target.checked })} />
              Present
            </Label>
          </FormGroup>
          <Button color="primary" type="submit">{editStudent ? "Update" : "Add"}</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default StudentForm;
