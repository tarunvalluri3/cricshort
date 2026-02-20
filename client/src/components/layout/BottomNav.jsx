import { Home, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-white/60";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-brand)] border-t border-white/20">
      <div className="max-w-md mx-auto flex justify-around py-3">
        
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${isActive("/")}`}
        >
          <Home size={18} />
          Home
        </Link>

        <Link
          to="/matches"
          className={`flex flex-col items-center text-xs ${isActive("/matches")}`}
        >
          <List size={18} />
          Matches
        </Link>

      </div>
    </div>
  );
};

export default BottomNav;