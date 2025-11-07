import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '@/types/card'; 
interface FavoritesState {
  items: Card[];
}
const initialState: FavoritesState = {
  items: [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Card>) => {
     
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
     
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;