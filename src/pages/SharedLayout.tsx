import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className="mt-12 h-[90vh] relative max-w-[400px] w-full mx-auto rounded-[25px] overflow-hidden box-border bg-[#F9F9F9]">
      <div className="fixed text-gray-300 text-sm left-4 top-3">
        Made by Ox09
      </div>
      <main className="h-full bg-gray-100">
        <Outlet /> 
      </main>

      <Navbar />
    </div>
  );
}
