import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import cardsReducer from './cardSlice';


export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cards: cardsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;