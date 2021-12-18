import { useState, useMemo, useContext, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useMountedState } from "react-use";
import useAsyncError from "../../../../hooks/useAsyncError";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { ownedExamsIndexRequest } from "../../../../services/exams/exams.service";
import ExamRecord from "../../../../components/exam-models/exam-record/exam-record.component";

const CreatedExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const page = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 1;
  }, [location]);
  const isMounted = useMountedState();
  const throwError = useAsyncError();

  useEffect(() => {
    if (Number(page) === Number(currentPage) || isLoading) {
      return;
    }
    setIsLoading(true);
    ownedExamsIndexRequest(token, page)
      .then((response) => response.data)
      .then(({ data, meta }) => {
        if (isMounted()) {
          setCurrentPage(Number(meta.current_page));
          setNumberOfPages(Number(meta.last_page));
        }
        return data;
      })
      .then(({ exams }) => {
        if (isMounted()) {
          setExams([...exams]);
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
    removeUserInfo,
    throwError,
  ]);

  if (
    !isLoading &&
    (Number(page) > Number(numberOfPages) || Number(page) <= 0)
  ) {
    return <Redirect to={programRoutes.indexCreatedExams()} />;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : exams.length > 0 ? (
        <>
          {exams.map((exam, idx) => {
            const links = [
              {
                linkName: "More Details",
                linkHref: programRoutes.examiningOverview(exam.exam_id),
              },
            ];

            const extraLinks = [
              {
                linkName: "Edit Exam",
                linkHref: programRoutes.updateExam(exam.exam_id),
              },
              {
                linkName: "Participants",
                linkHref: programRoutes.indexParticipants(exam.exam_id),
              },
            ];

            return (
              <ExamRecord
                links={links}
                extraLinks={extraLinks}
                key={exam.exam_id}
                exam={exam}
                className="mb-3"
              />
            );
          })}
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            prefix={programRoutes.indexCreatedExams()}
          />
        </>
      ) : (
        <p className="lead"> You have not created any exam yet </p>
      )}
    </>
  );
};

export default CreatedExamsPage;
