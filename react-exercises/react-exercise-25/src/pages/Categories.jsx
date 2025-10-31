import { Outlet } from "react-router-dom";
import { categories } from "../data/recipes";
import CategoryItem from "../components/ui/CategoryItem";

const Categories = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
      
      <div className="bg-white rounded-lg shadow-sm p-4 h-fit">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {categories.map((cat) => (
          <CategoryItem key={cat.id} category={cat} />
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Categories;