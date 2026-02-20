import { Link, useLocation } from "react-router-dom";
import { Home, History, Trophy } from "lucide-react";

const Footer = () => {
  const location = useLocation();

  const navItem = (path, label, Icon) => (
    <Link
      to={path}
      className={`flex items-center gap-2 text-sm transition ${
        location.pathname === path
          ? "text-orange-500 font-medium"
          : "text-gray-600 hover:text-black"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-md mx-auto px-6 py-10 space-y-8">

        {/* Navigation */}
        <div className="flex justify-between">
          {navItem("/", "Home", Home)}
          {navItem("/matches", "Matches", History)}
          {navItem("/leaderboard", "Leaderboard", Trophy)}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Branding */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-black">
            CricShort
          </p>
          <p className="text-xs text-gray-500">
            Manage your cricket matches with precision and style.
          </p>

          <p className="text-xs text-gray-400 pt-2">
            Made by <span className="text-gray-600 font-medium">Tarun Valluri</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;