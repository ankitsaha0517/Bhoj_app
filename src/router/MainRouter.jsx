import RecipeDish from "../Form/RecipeDish";
import Home from "../pages/Home";
import { Routes, Route } from "react-router";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-recipe-dish" element={<RecipeDish />} />
    </Routes>
  );
};

export default MainRouter;
