import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { registerCharts } from "./charts/registerCharts";
import routes from "./routes";
import Layout from "./pages/Layout";
registerCharts();

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
