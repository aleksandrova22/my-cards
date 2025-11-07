'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCard} from "../redux/cardSlice";
import { useRouter } from 'next/navigation';
import { Card } from '@/types/card';
import styles from './createProduct.module.css';
import { RootState } from '@/redux/store';



export function CreateProduct() {
    const dispatch = useDispatch();
    const router = useRouter();
    const existingCards = useSelector((state: RootState) => state.cards.items);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // очистка ошибки
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };


    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.id.trim()) {
            newErrors.id = 'ID обязателен';
        } else if (isNaN(Number(formData.id))) {
            newErrors.id = 'ID должен быть числом';
        } else if (existingCards.find(card => card.id === Number(formData.id))) {
            newErrors.id = 'ID уже существует';
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Название обязательно';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание обязательно';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'URL изображения обязателен';

        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const newCard: Card = {
                id: Number(formData.id),
                title: formData.title,
                description: formData.description,
                imageUrl: formData.imageUrl,
            };
            dispatch(addCard(newCard));
            router.push('/products'); // назад на список
        }
    };

    return <>

        <div className={styles.container}>
            <h1>Создать новый продукт</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="id">ID (число):</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className={errors.id ? styles.error : ''}
                    />
                    {errors.id && <span className={styles.errorText}>{errors.id}</span>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="title">Название:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? styles.error : ''}
                    />
                    {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={errors.description ? styles.error : ''}
                    />
                    {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="imageUrl">URL изображения:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={errors.imageUrl ? styles.error : ''}
                    />
                    {errors.imageUrl && <span className={styles.errorText}>{errors.imageUrl}</span>}
                </div>

                <button type="submit" className={styles.submitButton}>Создать продукт</button>
            </form>
        </div>

    </>;



}