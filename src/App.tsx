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
import Profile from "./pages/main/profile/profile";
import VerifyOTP from "./pages/auth/verify-otp/verify-otp";
import AccountActivated from "./pages/auth/AccountActivated/AccountActivated";
import NotesList from "./pages/main/Home/NotesList";
import NoteDetails from "./pages/main/Home/NoteDetails";
import MyNote from "./pages/main/notes/mynotes";
import EditNote from "./pages/main/notes/EditNote";
import ViewNote from "./pages/main/notes/ViewNote";


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
          <Route path="/my-notes" element={<MyNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/view-note/:id" element={<ViewNote />} />
        </Route>
</Routes>
  );
}
