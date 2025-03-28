import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";

export default function LoadingLayout() {

  return (
    <div className="flex flex-col min-h-screen">
       <Nav />

      <main className="flex-1">
        <Outlet />
      </main>

     <Footer />
    </div>
  );
}