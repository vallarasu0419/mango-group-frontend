import { useRoutes } from "react-router-dom";
import RegisterForm from "./pages//registerForm/RegisterForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ViewUser from "./pages/screen/ViewUser";
import Login from "./pages/login/Login";
import ViewQuestion from "./pages/screen/ViewQuestion";
import ViewDocuments from "./pages/screen/ViewDocuments";
import CreateUsers from "./pages/screen/CreateUsers";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboardLayout",
      element: <DashboardLayout />,
      children: [
        { path: "viewUser", element: <ViewUser /> },
        { path: "createUsers", element: <CreateUsers /> },
        { path: "viewQuestion", element: <ViewQuestion /> },
        { path: "viewDocuments", element: <ViewDocuments /> },
      ],
    },
  ]);
}
