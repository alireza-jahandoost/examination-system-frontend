import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import {
  stateConstructor,
  statesIndexEmpty,
  statesIndexFillTheBlank,
  statesIndexMultipleAnswer,
  statesIndexSelectTheAnswer,
  statesIndexTrueOrFalse,
  statesIndexOrdering,
  statesShowFillTheBlank,
  statesShowMultipleAnswer,
  statesShowSelectTheAnswer,
  statesShowTrueOrFalse,
  statesShowOrdering,
} from "../mocks/states.mock";

import { integerPartForFillTheBlank } from "../errors/failed-state-creation.error";

const statesHandler = [
  rest.get(
    apiRoutes.states.indexStates(":examId", ":questionId"),
    (req, res, ctx) => {
      const { questionId } = req.params;

      switch (Number(questionId)) {
        case 2:
          return res(ctx.json(statesIndexFillTheBlank));
        case 3:
          return res(ctx.json(statesIndexMultipleAnswer));
        case 4:
          return res(ctx.json(statesIndexSelectTheAnswer));
        case 5:
          return res(ctx.json(statesIndexTrueOrFalse));
        case 6:
          return res(ctx.json(statesIndexOrdering));
        default:
          return res(ctx.json(statesIndexEmpty));
      }
    }
  ),
  rest.get(
    apiRoutes.states.showState(":examId", ":questionId", ":stateId"),
    (req, res, ctx) => {
      const { questionId } = req.params;

      switch (questionId) {
        case 2:
          return res(ctx.json(statesShowFillTheBlank));
        case 3:
          return res(ctx.json(statesShowMultipleAnswer));
        case 4:
          return res(ctx.json(statesShowSelectTheAnswer));
        case 5:
          return res(ctx.json(statesShowTrueOrFalse));
        case 6:
          return res(ctx.json(statesShowOrdering));
        default:
          throw new Error("something went wrong");
      }
    }
  ),
  rest.post(
    apiRoutes.states.createState(":examId", ":questionId"),
    (req, res, ctx) => {
      const { integer_part, text_part } = req.body;
      const { questionId } = req.params;

      switch (Number(questionId)) {
        case 2:
          if (
            integer_part !== undefined ||
            text_part === undefined ||
            text_part === ""
          ) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  0,
                  text_part
                ),
              },
            })
          );
        case 3:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        case 4:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        case 5:
          if (integer_part === undefined || text_part !== undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part
                ),
              },
            })
          );
        case 6:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        default:
          throw new Error("something went wrong");
      }
    }
  ),
  rest.put(
    apiRoutes.states.updateState(":examid", ":questionId", ":stateId"),
    (req, res, ctx) => {
      const { integer_part, text_part } = req.body;
      const { questionId } = req.params;

      switch (Number(questionId)) {
        case 2:
          if (integer_part !== undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  0,
                  text_part
                ),
              },
            })
          );
        case 3:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        case 4:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        case 5:
          if (integer_part === undefined || text_part !== undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part
                ),
              },
            })
          );
        case 6:
          if (integer_part === undefined || text_part === undefined) {
            return res(ctx.status(401), ctx.json(integerPartForFillTheBlank));
          }
          return res(
            ctx.json({
              data: {
                state: stateConstructor(
                  Math.floor(Math.random() * 1000) + 1,
                  integer_part,
                  text_part
                ),
              },
            })
          );
        default:
          throw new Error("something went wrong");
      }
    }
  ),
  rest.delete(
    apiRoutes.states.deleteState(":examId", ":questionId", ":stateId"),
    (req, res, ctx) => {
      return res(ctx.status(202));
    }
  ),
];

export default statesHandler;
