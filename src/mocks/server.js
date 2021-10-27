// src/mocks/server.js

import { setupServer } from "msw/node";

import examsHandler from "./handlers/exams.handler";
import authenticationHandler from "./handlers/authentication.handler";
import participantsHandler from "./handlers/participants.handler";
import questionTypesHandler from "./handlers/question-types.handler";

// This configures a request mocking server with the given request handlers.

export const handlers = [
  ...examsHandler,
  ...authenticationHandler,
  ...participantsHandler,
  ...questionTypesHandler,
];

export const server = setupServer(...handlers);
