import Auth from "../src/pages/Auth/Auth";
import Todo from "../src/pages/Todo/Todo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const checkToken = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={checkToken ? <Navigate to="/todo" /> : <Auth />}
        />
        <Route
          path="/todo"
          element={checkToken ? <Todo /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
