// src/mocks/server.js

import { setupServer } from "msw/node";

// This configures a request mocking server with the given request handlers.

const handlers = [];

export const server = setupServer(...handlers);
