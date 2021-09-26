// src/mocks/server.js

import { setupServer } from "msw/node";

import examsHandler from "./examsHandler";

// This configures a request mocking server with the given request handlers.

const handlers = [...examsHandler];

export const server = setupServer(...handlers);
