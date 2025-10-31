import { useParams, Link } from "react-router-dom";
import { recipes } from "../data/recipes";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <Link to="/recipes" className="text-red-600 underline">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <Link to="/recipes" className="text-red-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Recipes
      </Link>
      
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{recipe.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-slate-900">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-slate-900">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;