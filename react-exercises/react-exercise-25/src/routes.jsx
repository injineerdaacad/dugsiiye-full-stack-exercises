import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Categories from "./pages/Categories";
import CategoryRecipes from "./pages/CategoryRecipes";
import CategoryEmpty from "./pages/CategoryEmpty";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "recipes", element: <Recipes /> },
      { path: "recipes/:id", element: <RecipeDetail /> },
      {
        path: "categories",
        element: <Categories />,
        children: [
          { index: true, element: <CategoryEmpty /> },
          { path: ":categoryId", element: <CategoryRecipes /> },
        ],
      },
    ],
  },
]);

export default router;