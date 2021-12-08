import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import RecordsTable from "../../../../components/records-table/records-table.component";
import { useMountedState } from "react-use";
import useAsyncError from "../../../../hooks/useAsyncError";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { ownedExamsIndexRequest } from "../../../../services/exams/exams.service";
import { convertFromUTCToHumanReadable } from "../../../../utilities/dateAndTime.utility";

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
      {" "}
      <h1>Created Exams</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : exams.length > 0 ? (
        <>
          <RecordsTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Exam Name</th>
                <th>Exam Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total Score</th>
                <th>Creation Time</th>
                <th>Last Update</th>
                <th>Published</th>
                <th>Register Needs Confirmation</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => {
                return (
                  <tr key={exam.exam_id}>
                    <td>{idx + 1}</td>
                    <td>{exam.exam_name}</td>
                    <td>{exam.exam_description}</td>
                    <td>{convertFromUTCToHumanReadable(exam.start_of_exam)}</td>
                    <td>{convertFromUTCToHumanReadable(exam.end_of_exam)}</td>
                    <td>{exam.total_score}</td>
                    <td>{convertFromUTCToHumanReadable(exam.creation_time)}</td>
                    <td>{convertFromUTCToHumanReadable(exam.last_update)}</td>
                    <td>{exam.published ? "YES" : "NO"}</td>
                    <td>{exam.needs_confirmation ? "YES" : "NO"}</td>
                    <td>
                      <div>
                        <Link to={programRoutes.updateExam(exam.exam_id)}>
                          <Button variant="success"> edit exam</Button>
                        </Link>
                      </div>
                      <div className="mt-2">
                        <Link
                          to={programRoutes.indexParticipants(exam.exam_id)}
                        >
                          <Button variant="success"> participants</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </RecordsTable>
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
