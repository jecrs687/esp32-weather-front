'use client';
import LoadingSpinner from '@/components/Spinner/spinner';
import styles from './wheater.module.css'
import React, { Ref, useEffect, useState } from 'react'
import { getBackground } from '@/utils/getBackground';
import useSWR from 'swr'
import axios from 'axios'
import { rain } from '@/utils/createRain';
import { firstLetterToUpperCase } from '@/utils/firtsLetterToUpperCase';
import { TimerComponent } from '@/components/Timer/timer';

import { optionsChart } from './options';
import { ChartComponent } from '@/components/Chart/chart';
import dynamic from 'next/dynamic';
const ThermComponent = dynamic(() => import('@/components/Therm/therm'), { ssr: false });


type Data = {
    temperature: number,
    humidate: number,
    molhado: number,
    shaking: number,
    timestamp: number,
    captures: number,

}
const endpoint = "https://top-redes-40e9a5ec3e40.herokuapp.com/"
async function getData() {
    const { data } = await axios.request<Array<Data>>({
        url: endpoint,
        method: 'GET',
    })
    return data

}
export const HomeComponent = () => {

    const { data: informations, isLoading } = useSWR('/api/user', {
        refreshInterval: 1000,
        fetcher: getData
    })
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [auto, setAuto] = useState<boolean>(true)
    const elRef = React.useRef(null)
    if (elRef.current) rain(elRef)
    
    const data = informations?.[
        auto
            ?informations.length - 1
            :selectedIndex         
    ]
    const next = () => {
        if (selectedIndex === informations?.length - 1) return;
        setAuto(false)
        setSelectedIndex((prevState) => prevState + 1)
    }

    const prev = () => {
        if (selectedIndex === 0) return;
        setAuto(false)
        setSelectedIndex((prevState) => prevState - 1)
    }

    return (
        <div id="background"
            className={styles.container}
            style={
                {background: `rgb(${getBackground(data?.temperature || 30)})`}
            }
        >
            <h1 className={styles.title}>Estação Meteorológica</h1>

            <div
                className={styles.dataBox}
            >
                <ThermComponent temp={data?.temperature || 0} />
               
                <div className={styles.dataContainer}>
                    <TimerComponent time={data?.timestamp} />
                    {isLoading ? <LoadingSpinner /> :
                        <>
                            <div className={styles.dataPoint}>
                                <span className={styles.icon}>🌡️</span>
                                <span className={styles.data}>Temperatura: {data.temperature}°C</span>
                            </div>

                            <div className={styles.dataPoint}>
                                <span className={styles.icon}>💧</span>
                                <span className={styles.data}>Umidade: {data.humidate}%</span>
                            </div>
                            <div className={styles.dataPoint}>
                                <span className={styles.icon}>🌧️</span>
                                <span className={styles.data}>Molhado: {data.molhado ? 'Sim' : 'Não'}
                                </span>
                            </div>
                            <div className={styles.dataPoint}>
                                <span className={styles.icon}>😖</span>
                                <span className={styles.data}>Tremores: {data.shaking}/{data.captures}
                                </span>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.buttonGroup}>
                                <div
                                    className={styles.button}
                                    onClick={() =>setSelectedIndex(0)}>
                                    ⏪️
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() => prev()}>
                                    ⬅️
                                </div>
                            </div>
                            <div
                                className={styles.buttonCenter}
                                style={{
                         
                                    background: auto ? "green" : "red"
                                }}
                                onClick={() =>setAuto((prevState) => !prevState)}>
                                Auto
                            </div>
                            <div
                                className={styles.buttonGroup}
                            >
                                <div
                                    className={styles.button}
                                    onClick={() => next()}>
                                    ➡️
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() =>setSelectedIndex(informations?.length - 1)}>
                                    ⏩️
                                </div>
                            </div>
                        </div>
                </>

                    }
            </div>
            <ChartComponent values={[data?.humidate || 0]} />

        </div>
        <section className={styles.rain}
        style={{
            zIndex: 1
        }}
        ref={elRef} />
        </div >
    )
}

