import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gunmetal flex justify-center">
      <nav className="px-[40px] py-[30px] w-[90%] flex justify-center md:justify-start">
        <Link to="/" className="text-lime font-semibold text-4xl">
          BookWise
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
