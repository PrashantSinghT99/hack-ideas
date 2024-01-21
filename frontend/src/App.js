import "./App.css";
import Login from "./components/Login/Login";
import Ideas from "./components/Ideas/Ideas";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "ideas",
      element: <Ideas />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
