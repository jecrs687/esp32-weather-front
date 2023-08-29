'use client';
import styles from './timer.module.css';
import { useEffect, useState } from 'react';
import { firstLetterToUpperCase } from '@/utils/firtsLetterToUpperCase';

const getTime = (timestamp: number) => new Date(timestamp).toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
})

export const TimerComponent = ({
    time
}:{
    time: number
}={
    time: Date.now()
}
) => {
    return (<div className={styles.data}>
            <h4>
                {firstLetterToUpperCase(getTime(time))} 
            </h4>
        </div>
    )
}
