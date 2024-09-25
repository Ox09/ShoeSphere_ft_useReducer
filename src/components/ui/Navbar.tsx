import { motion } from "framer-motion";
import { House, ShoppingBag, ShoppingCart, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const svgVariants = {
    hover: {
      scale: 1.2,
      //   fill: "#3498db", // Change fill on hover
      transition: { duration: 0.3 },
    },
    click: {
      scale: 0.9,
      transition: { duration: 0.2 },
    },
    initial: {
      fill: "#B8B8B8", // Default fill color
    },
  };
  const navLinks = [
    {
      to: "/",
      icon: <House />,
    },
    {
      to: "/explore",
      icon: <ShoppingBag />,
    },
    {
      to: "/cart",
      icon: <ShoppingCart />,
    },
    {
      to: "/settings",
      icon: <Settings />,
    },
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 p-4 rounded-3xl w-[90%] mx-auto flex justify-around bg-[#FFFFFF]">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) => (isActive ? "group activeLink" : "")}
        >
          {({ isActive }) => (
            <motion.div
              variants={svgVariants}
              initial="initial"
              whileHover="hover"
              whileTap="click"
            >
              {React.cloneElement(link.icon, {
                color: isActive ? "currentColor" : "gray", 
                size: 24,
                strokeWidth: 2.3,
              })}
            </motion.div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
