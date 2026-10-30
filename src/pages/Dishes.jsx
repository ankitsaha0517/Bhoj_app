import RecipeCard from "../components/RecipeCard";
import Tag from "../UI/Tag";
import { Btn } from "../UI/Btn";

const Dishes = () => {
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
              & Iconic Plates.
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

      {/* Recipe Cards Grid */}
      <RecipeCard  />
    </div>
  );
};

export default Dishes;
