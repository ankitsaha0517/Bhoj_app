import RecipeDish from "../form/RecipeDish";
import Dishes from "../pages/Dishes";
import Home from "../pages/Home";
import RecipeDetails from "../pages/RecipeDetails";
import { Routes, Route } from "react-router";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-dishs" element={<Dishes />} />
      <Route path="/add-recipe-dish" element={<RecipeDish />} />
      <Route path="/recipes/details/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default MainRouter;
