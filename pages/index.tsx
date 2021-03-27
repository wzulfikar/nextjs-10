import Head from 'next/head';

import styles from '@src/styles/Home.module.css';
import ToggleDarkMode from '@src/components/ToggleDarkMode';

export default function Home() {
  return (
    <div className={`${styles.container} dark:bg-[#111] vercel`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className="dark:text-white">Welcome to</span>{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          <span className="dark:text-white">Get started by editing </span>
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className="-mb-10">
          <ToggleDarkMode />
        </div>

        <div className={`${styles.grid} dark:text-white`}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={`${styles.footer} dark:bg-[#000]`}>
        <a
          className="dark:text-white"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img
            src="/vercel.svg"
            alt="Vercel Logo"
            className={`${styles.logo} dark:invert`}
          />
        </a>
      </footer>
    </div>
  );
}
