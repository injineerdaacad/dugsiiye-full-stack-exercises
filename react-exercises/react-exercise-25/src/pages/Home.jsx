import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-900 mt-4">
        Welcome to Recipe Book
      </h1>
      
      <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
        Discover delicious recipes and start cooking today!
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
        <Link
          to="/recipes"
          className="bg-red-600 text-white rounded-lg px-10 py-6 text-lg font-semibold shadow-md hover:bg-red-700 transition"
        >
          Browse Recipes
          <p className="text-sm font-normal mt-1 text-red-50">
            Explore our collection
          </p>
        </Link>

        <Link
          to="/categories"
          className="bg-red-600 text-white rounded-lg px-10 py-6 text-lg font-semibold shadow-md hover:bg-red-700 transition"
        >
          Recipe Categories
          <p className="text-sm font-normal mt-1 text-red-50">
            Find recipes by category
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;