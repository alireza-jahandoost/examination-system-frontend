// src/mocks/server.js

import { setupServer } from "msw/node";

import examsHandler from "./exams.handler";
import authenticationHandler from "./authentication.handler";

// This configures a request mocking server with the given request handlers.

const handlers = [...examsHandler, ...authenticationHandler];

export const server = setupServer(...handlers);
