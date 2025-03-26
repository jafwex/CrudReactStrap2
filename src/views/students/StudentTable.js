import React, { useContext, useState, useMemo, useCallback } from "react";
import { Table, Button, Input } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { StudentContext } from "../../context/StudentContext";
import DeleteConfirmation from "../../components/DeleteConfirmation";

const StudentTable = ({ onEdit }) => {
  const { students, handleDeleteStudent } = useContext(StudentContext);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);


  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);


  const handleDelete = useCallback((id) => {
    setDeleteId(id);
  }, []);

  return (
    <div className="p-4 border rounded shadow">
      <h3>Students</h3>
      <Input
        type="text"
        placeholder="Search..."
        className="mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.mobile}</td>
              <td>{student.present ? "Present" : "Absent"}</td>
              <td>
                <Button color="warning" size="sm" onClick={() => onEdit(student)}>
                  <FaEdit />
                </Button>{" "}
                <Button color="danger" size="sm" onClick={() => handleDelete(student.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteId && (
        <DeleteConfirmation
          id={deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            handleDeleteStudent(deleteId);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentTable;
