// src/mocks/server.js

import { setupServer } from "msw/node";

import examsHandler from "./handlers/exams.handler";
import authenticationHandler from "./handlers/authentication.handler";
import participantsHandler from "./handlers/participants.handler";

// This configures a request mocking server with the given request handlers.

export const handlers = [
  ...examsHandler,
  ...authenticationHandler,
  ...participantsHandler,
];

export const server = setupServer(...handlers);
