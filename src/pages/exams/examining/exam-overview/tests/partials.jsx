import { Route } from "react-router-dom";
import { rest } from "msw";
import { ExaminingProvider } from "../../../../../contexts/examining-context/examining.context";
import { ExamInfoProvider } from "../../../../../contexts/exam-info-context/exam-info.context";
import programRoutes from "../../../../../constants/program-routes.constant";
import apiRoutes from "../../../../../constants/api-routes.constant";
import { examConstructor } from "../../../../../mocks/mocks/exams.mock";
import { changeCurrentParticipant } from "../../../../../utilities/tests.utility";

export const wrapper = (ui, { exam = {}, participantId = 1 }) => {
  changeCurrentParticipant({
    participantId,
    otherHandlers: [
      rest.get(apiRoutes.exams.showExam(":examId"), (req, res, ctx) => {
        return res(ctx.json(examConstructor({ ...exam })));
      }),
    ],
  });

  const WrappedElement = (
    <Route path={programRoutes.examiningOverview(":examId")}>
      <ExamInfoProvider examId={exam.exam_id || 1}>
        <ExaminingProvider>{ui}</ExaminingProvider>
      </ExamInfoProvider>
    </Route>
  );
  return { WrappedElement };
};
