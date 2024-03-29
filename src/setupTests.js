// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// src/setupTests.js
import { server } from "./mocks/server.js";

jest.mock("./hooks/useMetaTag.js", () => ({
  __esModule: true,
  default: () => {},
}));

jest.setTimeout(8000);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
