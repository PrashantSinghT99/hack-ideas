import "./App.css";
import Login from "./components/Login/Login";
import Ideas from "./components/Ideas/Ideas";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Context from "./context/Context";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/ideas",
      element: <Ideas />,
    },
  ]);
  return (
    <>
      <Context>
        <RouterProvider router={router} />
      </Context>
    </>
  );
}

export default App;
