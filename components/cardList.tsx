
'use client';
import { useEffect, useState } from "react";
import { cards } from '../db';
import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "./cardItem";
// import { Card } from "@/types/card";
import { RootState } from "@/redux/store";
import styles from './cardList.module.css';


export function CardList() {

    const [filter, setFilter] = useState<'all' | 'favorites'>('all'); // Состояние для фильтра
    const dispatch = useDispatch();

    // Получаем все карточки и избранные из Redux
    const allCards = useSelector((state: RootState) => state.cards.items);
    const favorites = useSelector((state: RootState) => state.favorites.items);


    // Фильтруем данные: если 'favorites', показываем только избранные, иначе все
    const updatedData = filter === 'favorites' ? favorites : allCards;


    //const [updatedData, setUpdatedData] = useState(cards);

    return <>
        <div >
            <h2 className={styles.h2}>Картинки</h2>
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