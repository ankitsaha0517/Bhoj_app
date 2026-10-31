import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  UtensilsCrossed,
  AlertCircle,
  CheckCircle2,
  ChefHat,
  Clock,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { Btn } from "../UI/Btn";
import Tag from "../UI/Tag";
import { recipeContext } from "../context/RecipeContext";

const CUISINES = [
  "Bengali Heirloom",
  "North Indian & Awadhi",
  "South Indian Tiffin",
  "Mughlai & Biryani",
  "Heritage Street Food",
  "Pan-Asian & Dim Sum",
  "Artisanal Wood-Fired",
  "Coastal & Seafood",
];

const UpdateRecipeForm = () => {
  const { id } = useParams();
  const { data, setData } = useContext(recipeContext);
  const navigate = useNavigate();

  // Find existing recipe from context by ID
  const recipe = data?.find((item) => String(item.id) === String(id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, dirtyFields, isSubmitting },
  } = useForm({
    mode: "onTouched",
    values: recipe
      ? {
          recipeName: recipe.recipeName || "",
          restaurantName: recipe.restaurantName || "",
          cuisine: recipe.cuisine || "",
          cookingTime: recipe.cookingTime || "",
          ingredients: recipe.ingredients || "",
          instructions: recipe.instructions || "",
          imageUrl: recipe.imageUrl || "",
        }
      : undefined,
  });

  const onSubmit = (formData) => {
    const updatedData = data.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            ...formData,
            id: item.id,
            rating: item.rating || "4.8",
          }
        : item
    );

    setData(updatedData);
    console.log("Recipe Dish Updated:", formData);
    toast.success(`"${formData.recipeName}" updated successfully!`);

    // Redirect back to recipe details page
    navigate(`/recipes/details/${id}`);
  };

  // Helper to determine field validation status
  const getFieldState = (name) => {
    const error = errors[name]?.message;
    const isTouchedOrDirty = Boolean(touchedFields[name] || dirtyFields[name]);
    const isValid = !error && isTouchedOrDirty;
    return { error, isError: Boolean(error), isValid };
  };

  if (!recipe) {
    return (
      <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-16 text-center text-cream sm:px-8">
        <div className="rounded-full border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <UtensilsCrossed className="h-10 w-10 text-sage" />
        </div>
        <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          Recipe Not Found
        </h2>
        <p className="mt-2 text-sm text-cream/70 max-w-md">
          The dish you are trying to edit could not be found or may have been removed.
        </p>
        <Link
          to="/all-dishs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f4ea] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0f2a1b] hover:bg-[#e2ab35] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Curated Dishes
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-8 py-8 sm:py-12">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to={`/recipes/details/${id}`}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream/70 backdrop-blur-md transition-all duration-300 hover:border-[#e2ab35]/40 hover:bg-[#e2ab35]/10 hover:text-[#e2ab35]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Recipe Details
        </Link>

        <Tag title="Recipe Editor" />
      </div>

      {/* Main Form Container Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#143523]/90 via-[#0e271a]/95 to-[#091a11] p-6 sm:p-10 text-cream shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-center text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              UPDATE RECIPE DISH{" "}
              <span className="block sm:inline font-serif italic font-normal text-[#e2ab35]">
                & Heritage Notes.
              </span>
            </h1>
            <p className="mt-2 text-center text-xs sm:text-sm text-cream/70 leading-relaxed">
              Modify heirloom ingredients, cooking times, or refine secret techniques for {recipe.recipeName}.
            </p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Dish Photo URL */}
            {(() => {
              const { error, isError, isValid } = getFieldState("imageUrl");
              return (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="imageUrl"
                      className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                    >
                      Dish Photo URL <span className="text-[#e2ab35]">*</span>
                    </label>
                    {isValid && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid URL
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      id="imageUrl"
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      {...register("imageUrl", {
                        required: {
                          value: true,
                          message: "Photo URL is required",
                        },
                        validate: (val) =>
                          !val ||
                          /^https?:\/\/.+/.test(val) ||
                          "Please enter a valid URL starting with http:// or https://",
                      })}
                      className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 ${
                        isError
                          ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                          : isValid
                            ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                            : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                      }`}
                    />
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      {isError ? (
                        <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                      ) : (
                        <ImageIcon
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isValid ? "text-emerald-400" : "text-cream/40"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isError
                        ? "max-h-12 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                      <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                      {error}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Row 1: Recipe Name & Kitchen / Restaurant Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Recipe Name */}
              {(() => {
                const { error, isError, isValid } = getFieldState("recipeName");
                return (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="recipeName"
                        className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                      >
                        Recipe Name <span className="text-[#e2ab35]">*</span>
                      </label>
                      {isValid && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Looks Great
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="recipeName"
                        type="text"
                        placeholder="e.g. Royal Kosha Mangsho"
                        {...register("recipeName", {
                          required: "Recipe name is required.",
                          validate: (value) =>
                            value.trim().length >= 3 ||
                            "Recipe name must be at least 3 characters long.",
                        })}
                        className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 ${
                          isError
                            ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                            : isValid
                              ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                              : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                        }`}
                      />
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        {isError ? (
                          <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                        ) : (
                          <UtensilsCrossed
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isValid ? "text-emerald-400" : "text-cream/40"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isError
                          ? "max-h-12 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                        <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                        {error}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Kitchen / Restaurant Origin */}
              {(() => {
                const { error, isError, isValid } = getFieldState("restaurantName");
                return (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="restaurantName"
                        className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                      >
                        Kitchen / Restaurant Origin{" "}
                        <span className="text-[#e2ab35]">*</span>
                      </label>
                      {isValid && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Looks Great
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="restaurantName"
                        type="text"
                        placeholder="e.g. Kasundi Kitchen, Ballygunge"
                        {...register("restaurantName", {
                          required: "Kitchen or restaurant name is required.",
                          validate: (value) =>
                            value.trim().length >= 2 ||
                            "Restaurant name must be at least 2 characters long.",
                        })}
                        className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 ${
                          isError
                            ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                            : isValid
                              ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                              : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                        }`}
                      />
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        {isError ? (
                          <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                        ) : (
                          <ChefHat
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isValid ? "text-emerald-400" : "text-cream/40"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isError
                          ? "max-h-12 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                        <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                        {error}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Row 2: Cuisine Category & Cooking Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Cuisine Category */}
              {(() => {
                const { error, isError, isValid } = getFieldState("cuisine");
                return (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="cuisine"
                        className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                      >
                        Cuisine Profile <span className="text-[#e2ab35]">*</span>
                      </label>
                      {isValid && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <select
                        id="cuisine"
                        {...register("cuisine", {
                          required: "Please choose a cuisine category.",
                        })}
                        className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream bg-[#0e271a] backdrop-blur-md outline-none transition-all duration-300 appearance-none cursor-pointer ${
                          isError
                            ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                            : isValid
                              ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                              : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:ring-2 focus:ring-[#e2ab35]/25"
                        }`}
                      >
                        <option value="" disabled className="bg-[#0e271a] text-cream/40">
                          Select cuisine profile...
                        </option>
                        {CUISINES.map((c) => (
                          <option key={c} value={c} className="bg-[#0f2a1b] text-cream py-2">
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        {isError ? (
                          <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                        ) : (
                          <ChevronDown
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isValid ? "text-emerald-400" : "text-cream/40"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isError
                          ? "max-h-12 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                        <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                        {error}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Cooking Time */}
              {(() => {
                const { error, isError, isValid } = getFieldState("cookingTime");
                return (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="cookingTime"
                        className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                      >
                        Prep & Cooking Time (Minutes) <span className="text-[#e2ab35]">*</span>
                      </label>
                      {isValid && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="cookingTime"
                        type="number"
                        min="1"
                        placeholder="e.g. 45"
                        {...register("cookingTime", {
                          required: "Cooking time is required.",
                          validate: (val) =>
                            Number(val) > 0 ||
                            "Cooking time must be greater than 0 minutes.",
                        })}
                        className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                          isError
                            ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                            : isValid
                              ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                              : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                        }`}
                      />
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        {isError ? (
                          <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                        ) : (
                          <Clock
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isValid ? "text-emerald-400" : "text-cream/40"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isError
                          ? "max-h-12 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                        <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                        {error}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Key Ingredients */}
            {(() => {
              const { error, isError, isValid } = getFieldState("ingredients");
              return (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="ingredients"
                      className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                    >
                      Signature Ingredients <span className="text-[#e2ab35]">*</span>
                    </label>
                    {isValid && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Looks Great
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      id="ingredients"
                      type="text"
                      placeholder="e.g. A2 Desi Ghee, Yellow Mustard Paste, Kashmiri Chili, Bay Leaves"
                      {...register("ingredients", {
                        required: "Signature ingredients are required.",
                        validate: (val) =>
                          val.trim().length >= 6 ||
                          "Please list key ingredients (at least 6 characters).",
                      })}
                      className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 ${
                        isError
                          ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                          : isValid
                            ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                            : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                      }`}
                    />
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      {isError ? (
                        <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                      ) : (
                        <Sparkles
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isValid ? "text-emerald-400" : "text-cream/40"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isError
                        ? "max-h-12 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                      <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                      {error}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Preparation Method & Secret Notes */}
            {(() => {
              const { error, isError, isValid } = getFieldState("instructions");
              return (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="instructions"
                      className="text-[11.5px] font-bold uppercase tracking-wider text-sage"
                    >
                      Preparation Steps & Heritage Method <span className="text-[#e2ab35]">*</span>
                    </label>
                    {isValid && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Well Described
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      id="instructions"
                      rows={3}
                      placeholder="Describe the clay pot simmering, spice roasting sequence, or marination technique..."
                      {...register("instructions", {
                        required: "Preparation steps are required.",
                        validate: (val) =>
                          val.trim().length >= 15 ||
                          "Please provide at least 15 characters of preparation steps.",
                      })}
                      className={`w-full resize-none rounded-2xl border px-4 py-3.5 pr-11 text-sm text-cream placeholder-cream/35 backdrop-blur-md outline-none transition-all duration-300 ${
                        isError
                          ? "border-rose-500/80 bg-rose-950/20 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30"
                          : isValid
                            ? "border-emerald-500/60 bg-emerald-950/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                            : "border-white/15 bg-white/[0.05] hover:border-white/25 focus:border-[#e2ab35] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#e2ab35]/25"
                      }`}
                    />
                    <div className="pointer-events-none absolute right-4 top-4">
                      {isError ? (
                        <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse" />
                      ) : (
                        <BookOpen
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isValid ? "text-emerald-400" : "text-cream/40"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isError
                        ? "max-h-12 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="flex items-center gap-1.5 text-xs font-medium text-rose-300">
                      <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
                      {error}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Form Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-full border border-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cream/70 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Reset To Original
              </button>

              <div className="flex items-center gap-3">
                <Link
                  to={`/recipes/details/${id}`}
                  className="rounded-full border border-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cream/70 transition-all hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Link>

                <Btn
                  title={isSubmitting ? "Saving..." : "Save Recipe Changes"}
                  theme={1}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipeForm;
