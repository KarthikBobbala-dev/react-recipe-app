import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getRecipes } from "../Service/recipe.service"

const  initialState:any = {
    recipes:[],
    loading:false,
    error:null
}

export const fetchRecipe = createAsyncThunk('recipes/fetchRecipes', async(_,thunkAPI)=>{
    try {
        const data = await getRecipes();
        return data.recipes;
    } catch(error:any){
              return thunkAPI.rejectWithValue(error.message);
    }
});

const recipeSlice = createSlice({
    name:'recipes',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder
          // API request started
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API request successful
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })

      // API request failed
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
});
export default recipeSlice.reducer;