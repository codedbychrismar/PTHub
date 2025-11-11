import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Decking from "@/pages/Decking";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Decking /> },
    ],
  },
]);
