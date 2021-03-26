import { useEffect, useState } from 'react';

/**
 * @description
 * Allow component to activate msw in runtime
 */
export default function MswProvider({ active, children }) {
  const [worker, setWorker] = useState(null);
  const [workerStarted, setWorkerStarted] = useState(false);

  useEffect(() => {
    let subscribed = true;

    import('@tests/mocks/browser').then((mod) => {
      subscribed && setWorker(mod.default);
    });

    return () => {
      subscribed = false;
      worker?.stop();
    };
  }, []);

  useEffect(() => {
    if (active) {
      worker?.start().then(() => {
        setWorkerStarted(true);
      });
    } else {
      worker?.stop();
      setWorkerStarted(false);
    }
  }, [worker, active]);

  return active ? workerStarted && children : children;
}
