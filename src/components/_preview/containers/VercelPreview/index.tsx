import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import './style.module.css';

function ButtonNavbarCenter({ text }) {
  return (
    <span className="flex items-center mx-2 dark:text-gray-400">{text}</span>
  );
}

function ButtonNavbarRight({ text, primary = false }) {
  return (
    <button
      className={`${
        primary
          ? 'bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md font-medium'
          : 'text-gray-700 dark:text-gray-400 font-light'
      } text-sm mx-2`}
    >
      {text}
    </button>
  );
}

function Banner() {
  return (
    <div className="hidden dark:bg-[#1d1d1d] sm:flex justify-center w-screen space-x-2 bg-black text-white py-2 font-medium text-sm">
      <div>Introducing the Vercel Experts Marketplace</div>
      <span className="text-gray-700">|</span>
      <div>Explore &rarr;</div>
      <svg
        className="absolute right-2 opacity-50"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M18 6L6 18"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </div>
  );
}

// Add `text-transparent` class to activate the gradient
function GradientText({ text, from, to, style = {} }) {
  return (
    <span
      className={`${from} ${to} text-black dark:text-gray-700 relative bg-clip-text bg-gradient-to-r`}
      style={style}
    >
      {text}
    </span>
  );
}

export default function Home() {
  const dspRef = useRef(null);

  const router = useRouter();

  const darkMode = router.query.darkMode === 'true';

  useEffect(() => {
    const dspContainer = dspRef.current;

    const tween = {
      css: {
        color: 'transparent',
      },
      repeat: 1,
      yoyo: true,
    };

    // Use dynamic import for gsap to make sure that it's loaded in client side
    import('gsap').then(({ TimelineMax }) => {
      const tl = new TimelineMax({ repeat: -1 });
      for (let i = 0; i < dspContainer.children.length; i++) {
        tl.to(dspContainer.children[i], 1.2, tween);
      }
    });
  }, []);

  return (
    <div className={darkMode ? 'dark' : undefined}>
      <div className="h-screen dark:bg-black">
        <Head>
          <title>Vercel x Tailwind</title>
        </Head>

        <Banner />

        <main>
          {/* Navbar small (logo only) */}
          <div className="md:hidden flex justify-center items-center pt-5">
            <img
              className="h-5 dark:invert"
              src="/vercel.svg"
              alt="vercel logo"
            />
          </div>

          {/* Navbar */}
          <nav className="hidden md:flex justify-between items-center my-3 max-w-4xl mx-auto px-5">
            {/* Left navbar */}
            <div className="w-1/3 flex justify-start items-center">
              <img
                className="h-5 dark:invert"
                src="/vercel.svg"
                alt="vercel logo"
              />
            </div>

            {/* Center navbar */}
            <div className="w-1/3 flex justify-center items-center text-gray-700 font-light">
              <ButtonNavbarCenter text="Templates" />
              <ButtonNavbarCenter text="Analytics" />
              <ButtonNavbarCenter text="Pricing" />
            </div>

            {/* Right navbar */}
            <div className="w-1/3 flex justify-end items-center">
              <ButtonNavbarRight text="Contact" />
              <ButtonNavbarRight text="Login" />
              <ButtonNavbarRight text="Sign up" primary />
            </div>
          </nav>

          {/* Content */}
          <div className="pt-10 pb-10">
            <div
              ref={dspRef}
              className="mb-12 flex flex-col items-center justify-center font-extrabold tracking-tighter text-6xl md:text-9xl"
              style={{ lineHeight: 1.2 }}
            >
              <GradientText
                text="Develop."
                from="from-blue-600"
                to="to-green-400"
                style={{ bottom: '-0.2em' }}
              />
              <GradientText
                text="Preview."
                from="from-purple-600"
                to="to-pink-600"
              />
              <GradientText
                text="Ship."
                from="from-red-600"
                to="to-yellow-500"
                style={{ top: '-0.2em' }}
              />
            </div>

            <div className="mb-16 max-w-4xl mx-auto flex justify-center items-center">
              <button className="mx-2 w-48 rounded-md py-3 px-3 bg-black text-white dark:bg-white dark:text-black font-medium">
                Start Deploying
              </button>
              <button className="mx-2 w-48 rounded-md py-3 px-3 border border-gray-300 text-gray-700 dark:border-gray-500 dark:text-gray-400 font-medium hover:border-black dark:hover:border-gray-400 dark:hover:text-gray-300">
                Get a Demo
              </button>
            </div>

            <div className="mb-12 max-w-3xl mx-auto px-5 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-400">
                Vercel combines the best developer experience with an obsessive
                focus on end-user performance. Our platform enables frontend
                teams to do their best work.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
