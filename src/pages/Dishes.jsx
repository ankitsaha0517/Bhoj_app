import RecipeCard from "../components/RecipeCard";
import Tag from "../UI/Tag";
import { Btn } from "../UI/Btn";
import { useContext } from "react";
import { recipeContext } from "../context/RecipeContext";

const Dishes = () => {
  const { data } = useContext(recipeContext)

  return (
    <div className="relative z-10 mx-auto w-full max-w-350 px-4 py-8 sm:px-8 sm:py-12">
      {/* Editorial Header Section */}
      <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="mb-3">
            <Tag title="Epicurean Selection" />
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            CURATED DISHES{" "}
            <span className="block sm:inline font-serif italic font-normal text-[#e2ab35]">
              & <br /> Iconic Plates.
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-cream/70 max-w-xl leading-relaxed">
            Explore authentic heirloom recipes curated by verified diners and culinary historians across authentic tables.
          </p>
        </div>

        {/* Add Recipe Action Button */}
        <div className="shrink-0">
          <Btn
            title="Add Recipe Dish"
            theme={2}
            to="/add-recipe-dish"
          />
        </div>
      </div>

      {/* Recipe Cards Grid / Empty State */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((recipeData) => (
            <RecipeCard key={recipeData.id} recipe={recipeData} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
            No Dishes Available
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-cream/60 max-w-md">
            No recipes are currently present in the collection. Add your first heirloom dish to get started.
          </p>
          <div className="mt-6">
            <Btn title="Add Recipe Dish" theme={2} to="/add-recipe-dish" />
          </div>
        </div>
      )}
     
    </div>
  );
};

export default Dishes;
