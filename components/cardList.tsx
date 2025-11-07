
'use client';
import { useState } from "react";

import {  useSelector } from "react-redux";
import { CardItem } from "./cardItem";
// import { Card } from "@/types/card";
import { RootState } from "@/redux/store";
import styles from './cardList.module.css';


export function CardList() {

    const [filter, setFilter] = useState<'all' | 'favorites'>('all');
    // const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const allCards = useSelector((state: RootState) => state.cards.items);
    const favorites = useSelector((state: RootState) => state.favorites.items);


    // Фильтр : если 'favorites', показываем только избранные, иначе все
    let updatedData = filter === 'favorites' ? favorites : allCards;

    if (searchQuery.trim()) {
        updatedData = updatedData.filter(card =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return <>
        <div >

            <h2 className={styles.h2}>Продукты</h2>

            <div className={styles.input}>
                <input
                    type="text"
                    placeholder="Введите название"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <button onClick={() => setFilter('all')} className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`} >Все продукты</button>
            <button onClick={() => setFilter('favorites')}>Избранные</button>

            {
                updatedData?.length > 0 ? (
                    updatedData?.map((elem) =>
                        <CardItem key={elem.id} card={elem} />)

                ) : (
                    <p>Продукты для отображения отсутствуют</p>
                )

            }

        </div>
    </>;
};