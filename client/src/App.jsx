import "@xyflow/react/dist/style.css";

import DnDFlow from "./components/DndFlow";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flow from "./pages/Flow";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          element: <RequireAuth />, // Protect the following routes
          children: [
            { path: "/", element: <DnDFlow /> },
            { path: "flow", element: <Flow /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
