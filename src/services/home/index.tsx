/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import LoadingSpinner from '@/components/Spinner/spinner';
import styles from './wheater.module.css'
import React, { Ref, useEffect, useState } from 'react'
import { getBackground } from '@/utils/getBackground';

type Data = {
  temperature: number,
  humidate: number,
  molhado: number,
}

async function getData() {
  const res = await fetch('https://top-redes-40e9a5ec3e40.herokuapp.com/')
  const data = await res.json()
  return data
}


export const  HomeComponent = () => {
  const [ data, setData ] = useState({} as Data)
  const [ loading, setLoading ] = useState(false)
  const elRef = React.useRef(null)
  // if(elRef.current) rain(elRef)
  useEffect(() => {
    setInterval(async () => {
      setData(await getData())
      if(loading) setLoading(false)
    }, 4000)
  }, [])



  return (
    <div id="background" 
    className={styles.container}
    style={
      {
        background: `rgb(${getBackground(data.temperature||30)})`
      }
    }
    >
      <h1 className={styles.title}>Estação Meteorológica</h1>
      <div className={styles.rain} ref={elRef}></div>
      <div className={styles.dataContainer}>
        {loading ? <LoadingSpinner /> :
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
        </>
        }
      </div>
    </div>
  )
}
