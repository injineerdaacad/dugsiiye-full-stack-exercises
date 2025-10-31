import { recipes } from "../data/recipes";
import RecipeCard from "../components/ui/RecipeCard";

const Recipes = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">All Recipes</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;