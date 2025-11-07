 'use client'; 
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import { RootState } from '@/redux/store';
import { Fetcher } from '@/components/fetcher';




export default function CardID() {
    const params = useParams();
    const id = Number(params.id); 

 
    const card = useSelector((state: RootState) =>
        state.cards.items.find(item => item.id === id)
    );

    if (!card) {
        return <p>Продукт не найден</p>;
    }

    return (
        <div className='detail'>
            <h1>{card.title}</h1>
            <p>Описание: {card.description}</p>
              <Fetcher url={card.imageUrl} />
            <Link href="/products">
                <button className='backButton'>Назад к списку</button>
            </Link>
        </div>
    );
}
