/* eslint-disable @next/next/no-async-client-component */
'use client';
import LoadingSpinner from './public/spinner';
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

function updateGradient(temperature: number){
  let background = document.getElementById('background')
  if(!background) return
  if(temperature < 10){
    background.style.setProperty('background-image', 'linear-gradient(to bottom, #3ba3f5 0%, #8addee 50%, #e5a986 100%)')
  } else if(temperature < 20){
    background.style.setProperty('background-image', 'linear-gradient(to bottom, #8addee 0%, #e5a986 100%)')
  } else {
    background.style.setProperty('background-image', 'linear-gradient(to bottom, #8addee 0%, #e5a986 50%, #ed5353 100%)')
  }
}

export default function Home() {
  const [ data, setData ] = useState({} as Data)
  const [ loading, setLoading ] = useState(true)
  if(data) updateGradient(data.temperature)
  
  useEffect(() => {
    setInterval(async () => {
      setData(await getData())
      if(loading) setLoading(false)
    }, 4000)
  }, [])
  
  return (
    <div id="background" className={styles.container}>
      <h1 className={styles.title}>Estação Meteorológica</h1>
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
