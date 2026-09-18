import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favs:[]
}

const recipeFavorites = createSlice({
    name:'Favs',
    initialState,
    reducers:{
        addFavs:(state:any,action:any)=>{
            const recipe = action.payload;
            const alreadyExits = state.favs.some((item:any)=> item.id === recipe.id);

            if(!alreadyExits){
                        state.favs.push(recipe);
            }
            // state.favs.push(action.payload)
        },
        removeFavs:(state,action)=>{
         state.favs = state.favs.filter(
        (item: any) => item.id !== action.payload
      );
        }
    }
});

export const {addFavs,removeFavs} = recipeFavorites.actions;
export default  recipeFavorites.reducer