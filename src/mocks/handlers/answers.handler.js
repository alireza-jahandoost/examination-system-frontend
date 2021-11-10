import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import {
  indexWithoutAnswer,
  indexDescriptive,
  indexFillTheBlank,
  indexMultipleAnswers,
  indexSelectTheAnswer,
  indexTrueOrFalse,
  indexOrdering,
} from "../mocks/answers.mock";

const answersHandler = [
  rest.post(
    apiRoutes.answers.indexAnswers(":questionId", ":participantId"),
    (req, res, ctx) => {
      return res(ctx.status(201));
    }
  ),
  rest.delete(
    apiRoutes.answers.deleteAnswers(":questionId"),
    (req, res, ctx) => {
      return res(ctx.status(202));
    }
  ),
  rest.get(
    apiRoutes.answers.indexAnswers(":questionId", ":participantId"),
    (req, res, ctx) => {
      const { questionId, participantId } = req.params;
      if (Number(participantId) === 1) {
        return res(ctx.json(indexWithoutAnswer));
      }
      switch (Number(questionId)) {
        case 1:
          return res(ctx.json(indexDescriptive));
        case 2:
          return res(ctx.json(indexFillTheBlank));
        case 3:
          return res(ctx.json(indexMultipleAnswers));
        case 4:
          return res(ctx.json(indexSelectTheAnswer));
        case 5:
          return res(ctx.json(indexTrueOrFalse));
        case 6:
          return res(ctx.json(indexOrdering));
        default:
          return res(ctx.status(404));
      }
    }
  ),
];

export default answersHandler;