import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import {
  questionsIndex,
  questionsShowId_1,
  questionsShowId_2,
  questionsShowId_3,
  questionsShowId_4,
  questionsStoreTemp,
  questionsUpdateTemp,
} from "../mocks/questions.mock";
import { questionTextIsRequired } from "../errors/failed-question-creation.error";
import { questionScoreMustBeANumber } from "../errors/failed-question-update.error";

const questionsHandler = [
  rest.get(apiRoutes.questions.indexQuestions(":examId"), (req, res, ctx) => {
    return res(ctx.json(questionsIndex));
  }),

  rest.get(
    apiRoutes.questions.showQuestion(":examId", ":questionId"),
    (req, res, ctx) => {
      const { questionId } = req.params;
      switch (questionId) {
        case 1:
          return res(ctx.json(questionsShowId_1));
        case 2:
          return res(ctx.json(questionsShowId_2));
        case 3:
          return res(ctx.json(questionsShowId_3));
        case 4:
          return res(ctx.json(questionsShowId_4));
        default:
          return res(ctx.status(404));
      }
    }
  ),

  rest.post(apiRoutes.questions.createQuestion(":examId"), (req, res, ctx) => {
    const {
      question_text,
      question_score,
      can_be_shuffled,
      question_type_id,
    } = req.body;
    if (!question_text) {
      return res(ctx.status(422), ctx.json(questionTextIsRequired));
    }
    if (
      question_score === undefined ||
      can_be_shuffled === undefined ||
      question_type_id === undefined
    ) {
      throw Error("not handled request");
    }

    return res(
      ctx.status(201),
      ctx.json(
        questionsStoreTemp({
          question_text,
          question_score,
          can_be_shuffled,
          question_type_id,
        })
      )
    );
  }),

  rest.put(
    apiRoutes.questions.updateQuestion(":examId", "questionId"),
    (req, res, ctx) => {
      const { question_text, question_score, can_be_shuffled } = req.body;
      const { questionId } = req.params;

      const changed_question_score = Number(question_score);
      if (changed_question_score != changed_question_score) {
        return res(ctx.status(422), ctx.json(questionScoreMustBeANumber));
      }

      return res(
        ctx.json(
          questionsUpdateTemp({
            question_text,
            question_score: changed_question_score,
            can_be_shuffled,
            question_id: questionId,
          })
        )
      );
    }
  ),

  rest.delete(
    apiRoutes.questions.deleteQuestion(":examId", ":questionId"),
    (req, res, ctx) => {
      return res(ctx.status(202));
    }
  ),
];

export default questionsHandler;
