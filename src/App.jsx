import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Fragment } from "react";

// importing pages
import DashboardLayout from "./layout/CustomerSupport/Navbar"
import CustomerSupportDashboard from "./pages/Support/Dashboard"
import SupportTicketDetails from "./pages/Support/SupportTickets/SupportTicketDetails"
import PersonalInformation from "./pages/Support/Profile/PersonalInformation"
import UploadUserImage from "./pages/Support/Profile/UploadUserImage"
import ViewPersonalInfo from "./pages/Support/Profile/ViewPersonalInfo"
import "./App.css";

import Login from "./pages/Support/Auth/Login";
import Register from "./pages/Support/Auth/Register";

import PrivateRoutes from "./utils/PrivateRoutes"

const publicRoutes = (
  <Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
);

const privateRoutes = (
  <Route element={<PrivateRoutes />}>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<CustomerSupportDashboard />} />
      <Route path="ticket_details/:ticketId" element={<SupportTicketDetails />} />
      <Route path="edit_personal_info" element={<PersonalInformation />} />
      <Route path="upload_image" element={<UploadUserImage />} />
      <Route path="view_personal_info" element={<ViewPersonalInfo />} />
    </Route>
  </Route>
)


const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      {publicRoutes}
      {privateRoutes}
    </Fragment>
  )
);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>)
}

export default App;
