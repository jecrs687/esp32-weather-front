import styles from './wheater.module.css'

async function getData() {
  const res = await fetch('https://top-redes-40e9a5ec3e40.herokuapp.com/')
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Estação Meteorológica</h1>
      <div className={styles.dataContainer}>
        <div className={styles.dataPoint}>
          <span className={styles.icon}>🌡️</span>
          <span>Temperatura: <span className={styles.data}>15°C</span></span>
        </div>
        <div className={styles.dataPoint}>
          <span className={styles.icon}>💧</span>
          <span>umidade: <span className={styles.data}>15%</span></span>
        </div>
      </div>
    </div>
  )
}
