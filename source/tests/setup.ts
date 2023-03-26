import 'whatwg-fetch';
import '@testing-library/jest-dom';
import EventSource from 'eventsourcemock';

import { server } from './server';

global.EventSource = EventSource;

jest.mock('../constants/app', () => ({
  API_URL: 'http://api.killerparty.app',
}));

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

/**
 * Enable API mocking before tests.
 */
beforeAll(() => server.listen());

/**
 * Reset any runtime request handlers we may add during the tests.
 */
afterEach(() => server.resetHandlers());

/**
 * Disable API mocking after the tests are done.
 */
afterAll(() => server.close());
