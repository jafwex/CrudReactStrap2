import { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";

const StudentForm = ({ isOpen, toggle, editStudent }) => {
  const { handleAddStudent, handleUpdateStudent } = useContext(StudentContext);
  const [formData, setFormData] = useState({ name: "", mobile: "", present: false });

  useEffect(() => {
    setFormData({
      name: editStudent?.name || "",
      mobile: editStudent?.mobile || "",
      present: editStudent?.present || false
    });
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudent) {
        await handleUpdateStudent(editStudent.id, formData);
      } else {
        await handleAddStudent(formData);
      }
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{editStudent ? "Edit Student" : "Add Student"}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Mobile</Label>
            <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="present" checked={formData.present} onChange={handleChange} />
              Present
            </Label>
          </FormGroup>
          <Button color="primary" type="submit" disabled={!formData.name || !formData.mobile}>
            {editStudent ? "Update" : "Add"}
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default StudentForm;
