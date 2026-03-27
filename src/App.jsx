import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import POSPage from "./pages/POSPage";
import SalesPage from "./pages/SalesPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", index: true, element: <POSPage /> },
        { path: "categories", element: <CategoryPage /> },
        { path: "sales", element: <SalesPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
