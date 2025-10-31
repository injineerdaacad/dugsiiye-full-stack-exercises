import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition flex flex-col justify-between"
    >

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{recipe.title}</h3>
        <p className="text-slate-600 mt-2 line-clamp-2">{recipe.description}</p>
      </div>
      
      <span className="inline-block mt-4 px-3 py-1 text-xs font-medium rounded-md bg-pink-500 text-white capitalize w-fit">
        {recipe.category}
      </span>
    </Link>
  );
};

export default RecipeCard;