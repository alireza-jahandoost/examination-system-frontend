import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import {
  pageOneExamsIndex,
  pageTwoExamsIndex,
  pageThreeExamsIndex,
  notFoundPageExamsIndex,
  examShowId_1,
  examShowId_2,
  examShowId_3,
  examShowId_4,
  examShowId_5_withPassword,
} from "../mocks/exams.mock";

import { undefinedExamName } from "../errors/failed-exam-creation.error";

const examsHandler = [
  rest.get(apiRoutes.exams.indexAllExams(), (req, res, ctx) => {
    const valueOfPage = req.url.searchParams.get("page");
    const page = Number(valueOfPage);
    switch (page) {
      case 1:
        return res(ctx.json(pageOneExamsIndex));

      case 2:
        return res(ctx.json(pageTwoExamsIndex));

      case 3:
        return res(ctx.json(pageThreeExamsIndex));

      default:
        return res(ctx.json(notFoundPageExamsIndex(page)));
    }
  }),
  rest.get(`${apiRoutes.exams.indexAllExams()}/:examId`, (req, res, ctx) => {
    let { examId } = req.params;
    examId = Number(examId);

    switch (examId) {
      case 1:
        return res(ctx.json(examShowId_1));

      case 2:
        return res(ctx.json(examShowId_2));

      case 3:
        return res(ctx.json(examShowId_3));

      case 4:
        return res(ctx.json(examShowId_4));

      default:
        return res(ctx.status(404));
    }
  }),
  rest.post(`${apiRoutes.exams.createExam()}`, (req, res, ctx) => {
    const {
      exam_name,
      needs_confirmation,
      start_of_exam,
      end_of_exam,
      total_score,
      password,
    } = req.body;

    if (!exam_name) {
      return res(ctx.json(undefinedExamName), ctx.status(422));
    }
    if (
      needs_confirmation === undefined ||
      start_of_exam === undefined ||
      end_of_exam === undefined ||
      total_score === undefined
    ) {
      throw Error("unforeseen input variables");
    } else if (!password) {
      return res(ctx.json(examShowId_1), ctx.status(201));
    } else {
      return res(ctx.json(examShowId_5_withPassword), ctx.status(201));
    }
  }),
];

export default examsHandler;
