import { rest } from "msw";
import urlRoutes from "../../constants/urlRoutes.constant";
import {
  pageOneExamsIndex,
  pageTwoExamsIndex,
  pageThreeExamsIndex,
  notFoundPageExamsIndex,
  examShowId_1,
  examShowId_2,
  examShowId_3,
  examShowId_4,
} from "../mocks/exams.mock";

const examsHandler = [
  rest.get(urlRoutes["exams.index"], (req, res, ctx) => {
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
  rest.get(`${urlRoutes["exams.index"]}/:examId`, (req, res, ctx) => {
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
];

export default examsHandler;
