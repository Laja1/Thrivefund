import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import StartFundraiser from "./pages/StartFundraiser";
import Medical from "./pages/Medical";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/Signup"; // Ensure the correct capitalization here
import Details from "./pages/Details";
import About from "./pages/About";
import Verification from "./components/StartFunding/Verification";
import AccountDetails from "./pages/AccountDetails";
import Educational from "./pages/Educational";
import Others from './pages/Others';
import Dashboard from "./pages/Dashboard";
import PersonalInformation from "./pages/PersonalInformation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="medical" element={<Medical />} />
          <Route path="educational" element={<Educational />} />
          <Route path="others" element={<Others />} />
          <Route path="review-ongoing" element={<Verification />} />
          <Route path="startfundraiser" element={<StartFundraiser />} />
          <Route path="about-us" element={<About />} />
          <Route path="details/:id" element={<Details />} />
          
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<PersonalInformation />} />
            <Route path="account-details" element={<AccountDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
