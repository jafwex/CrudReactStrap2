import { StudentProvider } from "./context/StudentContext";
import Students from "./views/students";

function App() {
  return (
    <StudentProvider>
      <Students />
    </StudentProvider>
  );
}

export default App;
