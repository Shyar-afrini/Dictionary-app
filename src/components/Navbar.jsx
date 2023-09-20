import React, { useState } from "react";
import Input from "./Input";
import FetchData from "./FetchData";

const Navbar = () => {
  const [theme, setTheme] = useState(false);

  const darkModeToggle = () => {
    setTheme((prev) => !prev);
  };

  return (
    <div
      id="division"
      className={`lg:px-12 relative w-screen h-fit transition-all duration-500 ${
        theme ? "bg-white text-[#303030]" : "bg-[#0e0e10] text-white"
      }`}
    >
      <div className="w-full h-[2rem] font-cursive p-6 pt-8 md:p-10 flex justify-between">
        <h1
          className={`text-2xl font-bold italic cursive h-7 ${
            theme
              ? "drop-shadow-lg shadow-black"
              : "drop-shadow-lg shadow-white"
          }`}
        >
          Your AB&amp;C of the internet
        </h1>
        <div className="dark-mode-switch">
          <input onClick={darkModeToggle} type="checkbox" id="darkModeToggle" />
          <label htmlFor="darkModeToggle"></label>
        </div>
      </div>
      <Input theme={theme} />
      <div className="h-screen">
        <FetchData theme={theme} />
      </div>
    </div>
  );
};

export default Navbar;
