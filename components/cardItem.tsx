'use client';
import { Card } from "@/types/card";

// import { useState } from "react";
import { Fetcher } from "./fetcher";
import styles from './cardItem.module.css';
import { useDispatch, useSelector } from "react-redux";

import { addToFavorites, removeFromFavorites } from "@/redux/favoritesSlice";
import { RootState } from "@/redux/store";
import { removeCard } from "@/redux/cardSlice";
import { useRouter } from "next/navigation";



export function CardItem({ card }: { card: Card }) {
    //const url = 'https://disk.yandex.ru/client/disk/cards';

    const router = useRouter();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    // Проверяем, в избранном ли карточка
    const isFavorite = favorites.some(item => item.id === card.id);

    // Обработчик клика на сердце
    const handleHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites(card.id));
        } else {
            dispatch(addToFavorites(card));
        }
    };


    // Обработчик для удаления карточки
    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем всплытие клика на карточку
        dispatch(removeCard(card.id)); 
    };

    const handleCardClick = () => {
        router.push(`/products/${card.id}`);
    };

    return <>
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.content}>
                <Fetcher url={card.imageUrl} />
                <div className={styles.but} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.icon} onClick={handleHeartClick}>
                        <div className={`${styles.heart} ${isFavorite ? styles.heartFilled : ''}`}></div>
                    </div>
                    <div className={styles.icon} onClick={handleRemoveClick}>❌</div>
                </div>
            </div>
        </div>
    </>;
}