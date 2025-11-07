
'use client';
import {useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "./cardItem";
// import { Card } from "@/types/card";
import { RootState } from "@/redux/store";
import styles from './cardList.module.css';


export function CardList() {

    const [filter, setFilter] = useState<'all' | 'favorites'>('all'); // Состояние для фильтра
    // const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(''); // Добавлено: состояние для поиска
    // Получаем все карточки и избранные из Redux
    const allCards = useSelector((state: RootState) => state.cards.items);
    const favorites = useSelector((state: RootState) => state.favorites.items);


    // Фильтруем данные: если 'favorites', показываем только избранные, иначе все
    let updatedData = filter === 'favorites' ? favorites : allCards;

    if (searchQuery.trim()) {
        updatedData = updatedData.filter(card =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return <>
        <div >

            <h2 className={styles.h2}>Картинки</h2>

            <div className={styles.input}>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <button onClick={() => setFilter('all')} className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`} >Все карточки</button>
            <button onClick={() => setFilter('favorites')}>Избранные</button>

            {
                updatedData?.length > 0 ? (
                    updatedData?.map((elem) =>
                        <CardItem key={elem.id} card={elem} />)

                ) : (
                    <p>Карточки для отображения отсутствуют</p>
                )

            }

        </div>
    </>;
};