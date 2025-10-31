import { useParams } from "react-router-dom";
import { recipes, categories } from "../data/recipes";
import RecipeCard from "../components/ui/RecipeCard";

const CategoryRecipes = () => {
  const { categoryId } = useParams();
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const filtered = recipes.filter((r) => r.category === categoryId);

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        {selectedCategory ? selectedCategory.name : "Category"} Recipes
      </h2>
      
      {filtered.length === 0 ? (
        <p className="text-slate-500">No recipes in this category yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryRecipes;