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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<CustomerSupportDashboard />} />
      <Route path="ticket_details" element={<SupportTicketDetails />} />
      <Route path="edit_personal_info" element={<PersonalInformation />} />
      <Route path="upload_image" element={<UploadUserImage />} />
      <Route path="view_personal_info" element={<ViewPersonalInfo />} />
    </Route>
  )
);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>)
}

export default App;
