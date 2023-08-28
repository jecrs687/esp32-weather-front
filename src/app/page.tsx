/* eslint-disable @next/next/no-async-client-component */
'use client';
import styles from './wheater.module.css'
import { useEffect, useState } from 'react'

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

export default function Home() {
  const [ data, setData ] = useState({} as Data)
  
  useEffect(() => {
    setInterval(async () => {
      setData(await getData())
    }, 4000)
  }, [])
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Estação Meteorológica</h1>
      <div className={styles.dataContainer}>
        <div className={styles.dataPoint}>
          <span className={styles.icon}>🌡️</span>
          <span className={styles.data}>Temperatura: {data.temperature}°C</span>
        </div>
        <div className={styles.dataPoint}>
          <span className={styles.icon}>💧</span>
          <span className={styles.data}>Humidade: {data.humidate}%</span>
        </div>
        <div className={styles.dataPoint}>
          <span className={styles.icon}>🌧️</span>
          <span className={styles.data}>Molhado: {data.molhado == 1? "Sim": "Não"}</span>
        </div>
      </div>
    </div>
  )
}
