import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../Slices/recipe.slice";
import recipeFavs from '../Slices/recipefavs.slice'
const Store = configureStore({
  reducer: {
    recipes: recipeReducer,
    favs:recipeFavs
  }
});

export default Store;