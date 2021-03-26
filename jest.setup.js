import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

import server from '@tests/mocks/server';

// Suppress `console.info` to keep test result clean
console.info = () => {};

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Load env vars that are processed by next.js
loadEnvConfig(process.env.PWD);

// Temporary fix for error "TypeError: require.resolveWeak is not a function".
// See: https://github.com/vercel/next.js/discussions/18855#discussioncomment-285059
jest.mock('next/dynamic', () => (fn) => {
  let component = null;
  fn().then((mod) => {
    component = mod.default;
  });
  const DynamicComponent = (...args) => component(...args);
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
