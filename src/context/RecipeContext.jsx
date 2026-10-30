import { createContext, useState } from "react";

const recipeContext = createContext(null);

const RecipeContext = (props) => {
  const [data, setData] = useState([]);

  return (
    <recipeContext.Provider value={{ data, setData }}>
      {props.children}
    </recipeContext.Provider>
  );
};

export { RecipeContext, recipeContext };
