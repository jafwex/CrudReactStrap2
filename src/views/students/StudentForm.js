import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { StudentContext } from "../../context/StudentContext";
import { addStudent, updateStudent } from "../../services/students";

const StudentForm = ({ isOpen, toggle, selectedStudent }) => {
  const { fetchStudents } = useContext(StudentContext);
  const [formData, setFormData] = useState({ name: "", mobile: "", present: false });

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    } else {
      setFormData({ name: "", mobile: "", present: false });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.id) {
      await updateStudent(formData.id, formData);
    } else {
      await addStudent(formData);
    }

    await fetchStudents();  
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{formData.id ? "Edit Student" : "Add Student"}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Mobile Number</Label>
            <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="present" checked={formData.present} onChange={handleChange} /> Present
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>{formData.id ? "Update" : "Add"}</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default StudentForm;
