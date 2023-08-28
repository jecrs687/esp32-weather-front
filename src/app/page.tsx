import styles from './page.module.css'

async function getData() {
  const res = await fetch('https://top-redes-40e9a5ec3e40.herokuapp.com/')
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()
  return (
    <main className={styles.main}>
      {JSON.stringify(data)}
    </main>
  )
}
