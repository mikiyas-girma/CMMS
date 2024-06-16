import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { registerCharts } from "./charts/registerCharts";
import routes from "./routes";
import Layout from "./pages/Layout";
import { UserProvider } from "./utils/UserContext";
registerCharts();

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
