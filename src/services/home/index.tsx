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
// @ts-ignore
import Thermometer from "react-thermometer-chart";

import { optionsChart } from './options';
import { ChartComponent } from '@/components/Chart/chart';
type Data = {
    temperature: number,
    humidate: number,
    molhado: number,
}
const endpoint = "https://top-redes-40e9a5ec3e40.herokuapp.com/"
async function getData() {
    const { data } = await axios.request<Data>({
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

    const elRef = React.useRef(null)
    if (elRef.current) rain(elRef)
    const data = informations

    return (
        <div id="background"
            className={styles.container}
            style={
                {
                    background: `rgb(${getBackground(data?.temperature || 30)})`
                }
            }
        >
            <section className={styles.rain} ref={elRef} />
            <h1 className={styles.title}>Estação Meteorológica</h1>
            <h1 className={styles.title}></h1>

            <div
                className={styles.dataBox}
            >

                <Thermometer
                    width="150px"
                    height="250px"
                    steps={5}
                    color={
                        "rgb(" + getBackground(!isLoading ? data.temperature : 30) + ")"
                    }
                    minValue={0}
                    maxValue={45}
                    currentValue={data?.temperature || 20}
                />
                <div className={styles.dataContainer}>
                    <TimerComponent />
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
                        </>
                    }
                </div>
               <ChartComponent values={[data?.humidate || 0]} />
                
            </div>

        </div>
    )
}

