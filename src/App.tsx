import { Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import LoadingLayout from "./pages/LodingPages/LoadingLayout";
import LandingPage from "./pages/LodingPages/LandingPage";
import Login from "./pages/auth/login/login";
import Signup from "./pages/auth/signup/signup";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import MainLayout from "./pages/main/MainLayout";
import Home from "./pages/main/Home/Home";
import Favorites from "./pages/main/favorites/favorites";
import Notes from "./pages/main/notes/notes";
import Settings from "./pages/main/settings/settings";
import Profile from "./pages/main/profile/profile";
import VerifyOTP from "./pages/auth/verify-otp/verify-otp";
import AccountActivated from "./pages/auth/AccountActivated/AccountActivated";
import NotesList from "./pages/main/Home/NotesList";
import NoteDetails from "./pages/main/Home/NoteDetails";


export default function App() {
  return (
    
    <Routes>
    <Route path="/" element={<LoadingLayout />}>
    <Route index element={<LandingPage />} />
    
  </Route>

  <Route element={<AuthLayout />}>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-otp" element={<VerifyOTP />} />  {/* ✅ يدعم ?email= */}
        <Route path="account-activated" element={<AccountActivated />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Route>

        <Route element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="home" element={<NotesList />} />
          <Route path="note/:id" element={<NoteDetails />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
</Routes>
  );
}
