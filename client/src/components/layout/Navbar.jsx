import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItem = (path, label) => (
    <Link
      to={path}
      onClick={() => setOpen(false)}
      className={`block py-2 text-sm transition ${
        location.pathname === path
          ? "text-orange-500 font-medium"
          : "text-gray-700 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-semibold text-black text-base">
          CricShort
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItem("/", "Home")}
          {navItem("/matches", "Matches")}
          {navItem("/leaderboard", "Leaderboard")}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="max-w-md mx-auto px-6 py-4 space-y-2">
            {navItem("/", "Home")}
            {navItem("/matches", "Matches")}
            {navItem("/leaderboard", "Leaderboard")}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;