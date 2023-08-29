'use client';
import styles from './timer.module.css';
import { useEffect, useState } from 'react';
import { firstLetterToUpperCase } from '@/utils/firtsLetterToUpperCase';

const getTime = () => new Date().toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
})

export const TimerComponent = () => {
    const [time, setTime] = useState(getTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime())
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.data}>{firstLetterToUpperCase(time)} </div>
    )
}
