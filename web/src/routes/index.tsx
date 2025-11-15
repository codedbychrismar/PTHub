// router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import { DeckingPage } from "@/pages/DeckingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ActivePage } from "@/pages/ActivePage";
import { ActionPage } from "@/pages/ActionPage"; // NEW
import MembershipForm from "@/pages/MembershipForm";
import { CoachesPage } from "@/pages/CoachesPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <DeckingPage /> },   
      { path: "active", element: <ActivePage /> },
      { path: "decking", element: <DeckingPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "action", element: <ActionPage /> },
      { path: "membership-form", element: <MembershipForm /> },
      { path: "coaches", element: <CoachesPage /> }, 
 
    ],
  },
]);
