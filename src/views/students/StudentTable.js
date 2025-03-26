import React, { useContext, useState } from "react";
import { Table, Button } from "reactstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { StudentContext } from "../../context/StudentContext";
import DeleteConfirmation from "../../components/DeleteConfirmation";

const StudentTable = ({ onEdit }) => {
  const { students } = useContext(StudentContext);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.mobile}</td>
              <td>{student.present ? "Present" : "Absent"}</td>
              <td>
                <Button color="primary" onClick={() => onEdit(student)}>
                  <FaEdit />
                </Button>{" "}
                <Button color="danger" onClick={() => setDeleteId(student.id)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {deleteId && <DeleteConfirmation id={deleteId} onClose={() => setDeleteId(null)} />}
    </>
  );
};

export default StudentTable;
