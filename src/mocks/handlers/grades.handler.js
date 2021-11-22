import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import { showGrade } from "../mocks/grades.mock";

const gradesHandler = [
  rest.get(
    apiRoutes.participants.getGradeOfQuestion(":participantId", ":questionId"),
    (req, res, ctx) => {
      const { participantId, questionId } = req.params;
      return res(ctx.json(showGrade(participantId, questionId)));
    }
  ),
  rest.post(
    apiRoutes.participants.saveScoreOfQuestion(":questionId", ":participantId"),
    (req, res, ctx) => {
      return res(ctx.status(202));
    }
  ),
];

export default gradesHandler;
