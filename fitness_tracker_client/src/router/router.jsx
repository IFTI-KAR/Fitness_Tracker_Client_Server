import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Login/Register";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import TrainerDetails from "../pages/TrainerDeatails/TrainerDetails";
import BecomeATrainer from "../pages/BecomeATrainer/BecomeATrainer";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../contexts/AuthContext/PrivateRoute";
import ProfilePAge from "../pages/Dashboard/Member/ProfilePAge";
import AppliedTrainer from "../pages/Dashboard/Admin/AppliedTrainer";
import AdminTrainerDetails from "../pages/Dashboard/Admin/adminTrainerDetails";
import AllNewsletter from "../pages/Dashboard/Admin/Allnewsletter";
import AdminAllTrainer from "../pages/Dashboard/Admin/adminAllTrainer";
import AddClass from "../pages/Dashboard/Admin/AddClass";
import AllClasses from "../pages/AllClasses/AllClasses";
import ActivityLogPage from "../pages/Dashboard/Member/ActivityLogPage";
import BookTrainer from "../pages/BookTrainer/BookTrainer";
import Payment from "../pages/Payment/Payment";
import Balance from "../pages/Dashboard/Admin/Balance";
import AddForum from "../pages/Dashboard/Admin/addForum";
import Forum from "../pages/Forum/Forum";
import SingleForumPage from "../pages/SingleForum/SingleForumPage";
import BookedTrainer from "../pages/Dashboard/Member/BookedTrainer";
import ManageSlots from "../pages/Dashboard/Trainer/ManageSlots";
import AddSlot from "../pages/Dashboard/Trainer/AddSlot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "classes", element: <AllClasses /> },
      { path: "forum-page", element: <Forum /> },
      { path: "forum/post/:id", element: <PrivateRoute> <SingleForumPage /></PrivateRoute> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "trainers", element: <AllTrainer /> },
  { path: "trainers/:id", element: <PrivateRoute><TrainerDetails /></PrivateRoute> },
  { path: "become-a-trainer", element: <PrivateRoute><BecomeATrainer /></PrivateRoute>  },
  {
    path: "/book-trainer/:id",
    element: <PrivateRoute><BookTrainer /></PrivateRoute>,
  },
  {
    path: "/payment",
    element: <PrivateRoute><Payment /></PrivateRoute>,
    loader: ({ request }) => {
      const url = new URL(request.url);
      const trainerId = url.searchParams.get("trainerId");
      const slot = url.searchParams.get("slot");
      const selectedPackage = url.searchParams.get("package");

      const priceMap = {
        Basic: 10,
        Standard: 50,
        Premium: 100,
      };

      const userName = localStorage.getItem("userName") || "Test User";
      const userEmail = localStorage.getItem("userEmail") || "test@example.com";

      return fetch(`https://fitness-tracker-server-theta.vercel.app/trainers/${trainerId}`)
        .then((res) => res.json())
        .then((trainer) => {
          return {
            trainerId,
            trainerName: trainer.fullName,
            slot,
            package: selectedPackage,
            price: priceMap[selectedPackage] || 0,
            userName,
            userEmail,
          };
        });
    },
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "profilepage", element: <ProfilePAge /> },
      { path: "applied-trainer", element: <AppliedTrainer /> },
      { path: "trainer-details/:id", element: <AdminTrainerDetails /> },
      { path: "all-newsletter", element: <AllNewsletter /> },
      { path: "all-trainers", element: <AdminAllTrainer /> },
      { path: "add-class", element: <AddClass /> },
      { path: "activity-log", element: <ActivityLogPage /> },
      { path: "balance", element: <Balance /> },
      { path: "addforum", element: <AddForum /> },
      { path: "booked-trainer", element: <BookedTrainer /> },
      { path: "manage-slots", element: <ManageSlots /> },
      { path: "add-slot", element: <AddSlot /> },
    ],
  }
]);