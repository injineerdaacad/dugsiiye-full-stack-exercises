import { NavLink } from "react-router-dom";

const linkBase = "px-4 py-2 text-sm font-medium transition-colors duration-150";
const active = "text-red-600 border-b-2 border-red-600 -mb-[2px] bg-white/0";
const inactive = "text-slate-700 hover:text-red-500";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <NavLink to="/" className="text-xl font-bold text-red-600">
          Recipe Book
        </NavLink>

        <nav className="flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Recipes
          </NavLink>
          
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;