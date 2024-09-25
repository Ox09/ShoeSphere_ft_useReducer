import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import Cart from "./pages/Cart.tsx";
import SharedLayout from "./pages/SharedLayout.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/Cart", element: <Cart /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/:productId", element: <ProductDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
