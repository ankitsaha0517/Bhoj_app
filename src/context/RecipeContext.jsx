import { createContext, useState } from "react";

const recipeContext = createContext(null);

const RecipeContext = (props) => {
  // Initial temporary recipe data matching the schema collected in RecipeDish.jsx
  const [data, setData] = useState([
    {
      id: "rcp_bhoj_01",
      recipeName: "Royal Kosha Mangsho",
      restaurantName: "Kasundi Kitchen, Ballygunge",
      cuisine: "Bengali Heirloom",
      cookingTime: "75",
      ingredients:
        "Tender goat mutton, Kachi ghani mustard oil, Thick curd, Caramelized onions, Whole garam masala, Green chilies, Turmeric",
      instructions:
        "Marinate goat meat with curd and mustard oil for 3 hours. Slow-braise with caramelised onions in a heavy iron kadai on gentle heat until velvety dark and deeply aromatic.",
      imageUrl:
        "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rcp_bhoj_02",
      recipeName: "Dum Pukht Awadhi Biryani",
      restaurantName: "Purani Dilli Dastarkhwan, Lucknow",
      cuisine: "North Indian & Awadhi",
      cookingTime: "60",
      ingredients:
        "Long grain aged Basmati rice, Spring chicken, Desi ghee, Saffron infused milk, Rose water, Meetha ittar, Fried onions",
      instructions:
        "Parboil fragrant basmati rice with whole spices. Layer with succulent marinated meat, saffron milk, and fried onions. Seal handi with wheat dough and slow steam on live charcoal.",
      imageUrl:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rcp_bhoj_03",
      recipeName: "Crisp Ghee Podi Roast",
      restaurantName: "The Dosa Counter, Mylapore",
      cuisine: "South Indian Tiffin",
      cookingTime: "25",
      ingredients:
        "Fermented stoneground rice & urad dal batter, A2 spiced ghee, Gunpowder podi, Spiced mustard potato masala, Curry leaves",
      instructions:
        "Spread fermented batter wafer-thin on a seasoned cast iron tawa. Lather generously with golden A2 ghee and spicy podi. Fill with tempered mashed potato and fold into a crisp golden cone.",
      imageUrl:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rcp_bhoj_04",
      recipeName: "Artisanal Margherita Verace",
      restaurantName: "Forno & Flour, Park Street",
      cuisine: "Artisanal Wood-Fired",
      cookingTime: "15",
      ingredients:
        "72-hour cold fermented sourdough base, San Marzano tomato sauce, Fresh Fior di Latte mozzarella, Sweet basil, Extra virgin olive oil",
      instructions:
        "Hand-stretch cold fermented dough to preserve air pockets. Spread crushed San Marzano tomato puree, hand-torn fresh mozzarella, and bake in wood-fired oven at 450°C for 90 seconds.",
      imageUrl:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  return (
    <recipeContext.Provider value={{ data, setData }}>
      {props.children}
    </recipeContext.Provider>
  );
};

export { RecipeContext, recipeContext };
