import * as Fathom from 'fathom-client';
import { Event } from './events';

export * from './events';

/**
 * @description
 * Initiate your analytic handler. You can execute this
 * in `useEffect` of your `pages/_app.tsx` file.
 *
 * @see
 * Example with Fathom:
 * [https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel](https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel)
 */
export function init() {
  if (process.env.NODE_ENV === 'production') {
    // You can replace this code with your preferred analytic
    const domains = process.env.NEXT_PUBLIC_FATHOM_INCLUDED_DOMAINS || '';
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      url: process.env.NEXT_PUBLIC_FATHOM_URL,
      includedDomains: domains.split(','),
    });
  }
}

export function trackPageView() {
  if (process.env.NODE_ENV === 'production') {
    // You can replace this code with your preferred analytic
    Fathom.trackPageview();
  }
}

export function trackGoal({ event, centValue = 0 }: Event) {
  Fathom.trackGoal(event, centValue);
}

export default { init, trackPageView, trackGoal };
