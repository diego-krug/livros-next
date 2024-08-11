import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '../componentes/Menu';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Loja Next</title>
                <meta name="description" content="Página Inicial da Loja Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={`${styles.main} py-4`} style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
                <h1 className="text-center" style={{ color: '#343a40', paddingTop: '100px' }}>Página Inicial</h1>
            </main>
        </div>
    );
};

export default Home;