import Head from 'next/head';
import Link from 'next/link';
import { DiGithubBadge } from 'react-icons/di';

import styles from '@src/styles/Home.module.css';
import ToggleDarkMode from '@src/components/ToggleDarkMode';
import getGithubUrl from '@src/lib/github/getGithubUrl';
import trackGoal from '@src/utils/trackGoal';

const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO;
const repoParts = githubRepo.split('/');
const repoName = repoParts.pop();
const owner = repoParts.pop();

const githubUrl = getGithubUrl({
  owner,
  repo: repoName,
  branch: 'main',
  file: 'pages/index.tsx',
});

export default function Home() {
  return (
    <div className={`${styles.container} dark:bg-[#111] vercel`}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className="dark:text-white">Welcome to</span>{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          <span className="dark:text-white">Get started by editing </span>
          <code className={styles.code}>
            <a
              title="Open pages/index.tsx in Github"
              className="hover:underline"
              href={githubUrl}
              onClick={() => trackGoal('LandingPage_OpenGithubRepo')}
            >
              pages/index.tsx
              <DiGithubBadge className="ml-1 h-6 w-6 inline relative -top-0.5" />
            </a>
          </code>
        </p>

        <div className="mt-3 -mb-9">
          <ToggleDarkMode />
        </div>

        <div className={`${styles.grid} dark:text-white`}>
          <Link href={`/_preview`}>
            <a className={styles.card}>
              <h3>Preview &rarr;</h3>
              <p>
                Preview sample components at <code>/_preview</code>.
              </p>
            </a>
          </Link>

          <a
            href={`/analytic`}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Analytic &rarr;</h3>
            <p>View analytic dashboard for this Next.js template.</p>
          </a>
        </div>

        <div
          className={
            'dark:text-white font-semibold  w-full flex justify-center sm:justify-start sm:pl-12 mt-2'
          }
        >
          <p>More from Next.js official:</p>
        </div>

        <div
          className={`${styles.grid} dark:text-white`}
          style={{ marginTop: 0 }}
        >
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
