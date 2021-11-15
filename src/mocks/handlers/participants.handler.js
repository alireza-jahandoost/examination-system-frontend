import { rest } from "msw";
import { examsPassword } from "../mocks/participants.mock";
import apiRoutes from "../../constants/api-routes.constant";
import { showParticipant } from "../mocks/participants.mock";

const participantsHandler = [
  rest.post(apiRoutes.exams.registerInExam(":examId"), (req, res, ctx) => {
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
        if (password === examsPassword) {
          return res(ctx.status(201));
        } else {
          return res(ctx.status(403));
        }
      case 5: // for have password exams that are started
        if (password === examsPassword) {
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
  rest.put(apiRoutes.participants.finishExam(":examId"), (req, res, ctx) => {
    const { examId } = req.params;
    switch (Number(examId)) {
      case 1:
        return res(ctx.status(202));
      case 2:
        return res(ctx.status(403));
      default:
        return res(ctx.status(401));
    }
  }),
  rest.get(
    apiRoutes.participants.currentParticipant(":examId"),
    (req, res, ctx) => {
      return res(ctx.json(showParticipant));
    }
  ),
];

export default participantsHandler;
