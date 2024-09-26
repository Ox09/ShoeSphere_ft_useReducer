import Navbar from "@/components/ui/Navbar";
import { Outlet, Link } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className="py-8 h-screen relative  mx-auto  box-border">
      <Link
        to="https://github.com/Ox09/ShoeSphere_ft_useReducer"
        className=" fixed text-gray-300 text-xs sm:text-sm left-4 top-3"
      >
        Made by Ox09
      </Link>
      <main className="relative h-full w-full max-w-80 mx-auto rounded-[1.5625rem] overflow-hidden bg-gray-100">
        <Outlet />
        <Navbar />
      </main>
    </div>
  );
}
