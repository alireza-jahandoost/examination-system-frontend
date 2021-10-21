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
  rest.post(`${apiRoutes.exams.indexAllExams()}`, (req, res, ctx) => {
    const {
      exam_name,
      needs_confirmation,
      start_of_exam,
      end_of_exam,
      total_score,
      password,
    } = req.body;
    console.log(req);

    if (exam_name === undefined) {
      return res.json(undefinedExamName);
    }
    if (!needs_confirmation || !start_of_exam || !end_of_exam || !total_score) {
      throw Error("unforeseen input variables");
    } else if (!password) {
      return res.json(examShowId_1);
    } else {
      return res.json(examShowId_5_withPassword);
    }
  }),
];

export default examsHandler;
