import React from "react";
import { StudentProvider } from "./context/StudentContext";
import Students from "./views/students/index";

const App = () => (
  <StudentProvider>
    <Students />
  </StudentProvider>
);

export default App;
