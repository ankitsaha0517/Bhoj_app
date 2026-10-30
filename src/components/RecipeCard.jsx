import { useContext } from "react";
import { recipeContext } from "../context/RecipeContext";
import { Clock, ChefHat, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";

const RecipeCard = () => {
  const { data } = useContext(recipeContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((recipe) => (
        <div
          key={recipe.id}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a1f13] shadow-lg transition-transform hover:-translate-y-1"
        >
          {/* Card Image & Gradient */}
          <div className="relative h-64 w-full">
            <img
              src={recipe.imageUrl}
              alt={recipe.recipeName}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f13] via-transparent to-black/30" />

            {/* Cuisine Badge & Rating */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-[#cbd9a8] backdrop-blur-md">
                {recipe.cuisine}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-[#e2ab35] backdrop-blur-md">
                <Star className="h-3 w-3 fill-current" />
                {recipe.rating || "4.8"}
              </span>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-5">
            <h3 className="font-display text-xl font-bold text-white">
              {recipe.recipeName}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-cream/70">
              <ChefHat className="h-3.5 w-3.5 text-[#e2ab35]" />
              {recipe.restaurantName}
            </p>

            {/* Bottom Row */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="flex items-center gap-1.5 text-xs text-cream/70">
                <Clock className="h-3.5 w-3.5 text-[#cbd9a8]" />
                {recipe.cookingTime} mins
              </span>

              <Link to={`/recipes/details/${recipe.id}`}>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full bg-[#f7f4ea] px-4 py-1.5 text-xs font-bold text-[#0f2a1b] hover:bg-[#e2ab35] transition-colors cursor-pointer"
                >
                  View Recipe
                  <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
