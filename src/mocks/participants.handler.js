import { rest } from "msw";
import urlConfig from "../constants/urlConfig.constant";

const baseUrl = urlConfig.baseUrl;

const participantsHandler = [
  rest.post(`${baseUrl}/exams/:examId/register`, (req, res, ctx) => {
    const { password } = req.body;
    let { examId } = req.params;
    examId = Number(examId);
    switch (examId) {
      case 1: // for without password exams that are not started
        return res(ctx.status(201));
      case 2: // for without password exams that user already registered
        return res(ctx.status(201));
      case 3: // for without password exams that are finished
        return res(ctx.status(403));
      case 4: // for have password exams that are not started
        if (password === "password") {
          return res(ctx.status(201));
        } else {
          return res(ctx.status(403));
        }
      case 5: // for have password exams that are started
        if (password === "password") {
          return res(ctx.status(201));
        } else {
          return res(ctx.status(403));
        }
      case 6: // for have password exams that are finished
        return res(ctx.status(403));
      default:
        return res(ctx.status(404));
    }
  }),
];

export default participantsHandler;
