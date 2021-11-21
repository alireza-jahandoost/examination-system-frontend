import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { useMountedState } from "react-use";
import Sidebar from "../../../../components/sidebar/sidebar.component";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { participatedExamsIndexRequest } from "../../../../services/exams/exams.service";
import { convertFromUTC } from "../../../../utilities/dateAndTime.utility";

const ParticipatedExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthenticationContext);
  const location = useLocation();
  const page = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 1;
  }, [location]);
  const isMounted = useMountedState();

  useEffect(() => {
    if (Number(page) === Number(currentPage) || isLoading) {
      return;
    }
    setIsLoading(true);
    participatedExamsIndexRequest(token, page)
      .then((response) => response.data)
      .then(({ data, meta }) => {
        if (isMounted()) {
          setCurrentPage(meta.current_page);
          setNumberOfPages(meta.last_page - meta.from + 1);
        }
        return data;
      })
      .then(({ exams }) => {
        if (isMounted()) {
          setExams([...exams]);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, [page, token, isMounted, currentPage, isLoading]);

  if (
    !isLoading &&
    (Number(page) > Number(numberOfPages) || Number(page) <= 0)
  ) {
    return <Redirect to={programRoutes.indexParticipatedExams()} />;
  }

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Participated Exams</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : exams.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Exam Name</th>
                    <th>Exam Description</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Total Score</th>
                    <th>Status</th>
                    <th>Grade</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => {
                    return (
                      <tr key={exam.exam_id}>
                        <td>{exam.exam_id}</td>
                        <td>{exam.exam_name}</td>
                        <td>{exam.exam_description}</td>
                        <td>{convertFromUTC(exam.start_of_exam)}</td>
                        <td>{convertFromUTC(exam.end_of_exam)}</td>
                        <td>{exam.total_score}</td>
                        <td>{exam.status}</td>
                        <td>{exam.grade}</td>
                        <td>
                          <Link
                            to={programRoutes.examiningOverview(exam.exam_id)}
                          >
                            exam overview
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                prefix={programRoutes.indexParticipatedExams()}
              />
            </>
          ) : (
            <p className="lead"> You have not participated in any exam yet </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ParticipatedExamsPage;
