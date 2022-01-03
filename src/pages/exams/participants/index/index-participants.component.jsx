import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation, Redirect, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMountedState } from "react-use";
import RecordsTable from "../../../../components/records-table/records-table.component";
import useAsyncError from "../../../../hooks/useAsyncError";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import { ExamInfoContext } from "../../../../contexts/exam-info-context/exam-info.context";
import { UserProvider } from "../../../../contexts/user-context/user.context";
import { ConfirmParticipantProvider } from "../../../../contexts/confirm-participant-context/confirm-participant.context";

import { indexParticipantsRequest } from "../../../../services/participants/participants.service";

import ParticipantRecord from "./participant-record.component";

const IndexParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { examId } = useParams();
  const page = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 1;
  }, [location]);
  const isMounted = useMountedState();
  const throwError = useAsyncError();
  const { exam, examTime, isContextLoaded } = useContext(ExamInfoContext);

  useEffect(() => {
    if (Number(page) === Number(currentPage) || isLoading) {
      return;
    }
    setIsLoading(true);
    indexParticipantsRequest(examId, token, page)
      .then((response) => response.data)
      .then(({ data, meta }) => {
        if (isMounted()) {
          setPageSize(Number(meta.per_page));
          setCurrentPage(Number(meta.current_page));
          setNumberOfPages(Number(meta.last_page));
        }
        return data;
      })
      .then(({ participants }) => {
        if (isMounted()) {
          setParticipants([...participants]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        switch (Number(err?.response?.status)) {
          case 401:
            removeUserInfo();
            break;
          default:
            throwError(err);
        }
      });
  }, [
    page,
    token,
    isMounted,
    currentPage,
    isLoading,
    examId,
    removeUserInfo,
    throwError,
  ]);

  if (
    !isLoading &&
    (Number(page) > Number(numberOfPages) || Number(page) <= 0)
  ) {
    return <Redirect to={programRoutes.indexParticipants(examId)} />;
  }

  return (
    <>
      <div className="text-start bg-white p-3 rounded shadow border mb-3">
        <h2 className="display-6 mx-2">
          Exam Name: {exam ? exam.exam_name : "..."}
        </h2>
        <Link to={programRoutes.updateExam(examId)}>
          <Button className="mx-2" variant="warning">
            edit exam
          </Button>
        </Link>
        <Link to={programRoutes.examiningOverview(examId)}>
          <Button className="mx-2" variant="info">
            exam overview
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded border shadow p-3">
        <h1 className="display-4">Participants</h1>
        {isLoading || !isContextLoaded ? (
          <p>Loading...</p>
        ) : participants.length > 0 ? (
          <>
            <RecordsTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant Name</th>
                  <th>Participant Status</th>
                  {exam.needs_confirmation && <th>Confirmation Status</th>}
                  <th>Grade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, idx) => {
                  return (
                    <UserProvider
                      userId={participant.user_id}
                      key={participant.participant_id}
                    >
                      <ConfirmParticipantProvider examId={examId}>
                        <ParticipantRecord
                          needsConfirmation={exam.needs_confirmation}
                          participant={participant}
                          examId={examId}
                          index={idx + 1 + (currentPage - 1) * pageSize}
                          canUserConfirmParticipant={!examTime.isExamFinished}
                        />
                      </ConfirmParticipantProvider>
                    </UserProvider>
                  );
                })}
              </tbody>
            </RecordsTable>
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              prefix={programRoutes.indexParticipants(examId)}
            />
          </>
        ) : (
          <p className="lead">
            no one have participated in this exam yet <br />
            check whether your exam is published or not(another users can not
            see the exams if they are not published)
          </p>
        )}
      </div>
    </>
  );
};

export default IndexParticipantsPage;
