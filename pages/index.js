import Head from 'next/head';
import styles from '../styles/Home.module.css';
import HomePage from '../components/HomePage';

export default function Home() {
    
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Speed</title>
        <meta name="keywords" content="typing" />
      </Head>
      <HomePage />
    </div>
  )
}
