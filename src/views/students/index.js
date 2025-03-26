import { useState } from "react";
import StudentTable from "./StudentTable";
import StudentForm from "./StudentForm";
import { Button, Container } from "reactstrap";

const Students = () => {
  const [modal, setModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const toggleModal = () => setModal(!modal);

  return (
    <Container>
      <h1>Students</h1>
      <Button color="primary" onClick={() => { setEditStudent(null); toggleModal(); }}>Add Student</Button>
      <StudentTable onEdit={(student) => { setEditStudent(student); toggleModal(); }} />
      <StudentForm isOpen={modal} toggle={toggleModal} editStudent={editStudent} />
    </Container>
  );
};

export default Students;
