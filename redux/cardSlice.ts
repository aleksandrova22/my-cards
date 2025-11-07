import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '@/types/card';
import { cards as initialCards } from '../db';

interface CardsState {
    items: Card[];
}
const initialState: CardsState = {
    items: initialCards,
};
const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        removeCard: (state, action: PayloadAction<number>) => { // Удаление по id 
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        addCard: (state, action: PayloadAction<Card>) => { // для добавления новой карточки
            // проверка что нет такого id 
            if (!state.items.find(item => item.id === action.payload.id)) {
                state.items.push(action.payload);
            }},


        },
    });
export const { removeCard , addCard} = cardsSlice.actions;
export default cardsSlice.reducer;
