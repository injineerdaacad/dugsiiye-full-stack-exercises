import { NavLink } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <NavLink
      to={`/categories/${category.id}`}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-md mb-2 ${
          isActive ? "bg-red-50 text-red-600" : "hover:bg-slate-50"
        }`
      }
    >
      
      <h3 className="font-semibold">{category.name}</h3>
      <p className="text-sm text-slate-500">{category.description}</p>
    </NavLink>
  );
};

export default CategoryItem;