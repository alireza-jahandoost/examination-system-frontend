import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { useMountedState } from "react-use";
import Sidebar from "../../../../components/sidebar/sidebar.component";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { ownedExamsIndexRequest } from "../../../../services/exams/exams.service";

const CreatedExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { token } = useContext(AuthenticationContext);
  const location = useLocation();
  const page = useMemo(() => {
    return new URLSearchParams(location.search).get("page") || 1;
  }, [location]);
  const isMounted = useMountedState();

  useEffect(() => {
    ownedExamsIndexRequest(token, page)
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
        }
      })
      .catch((err) => console.error(err));
  }, [page, token, isMounted]);

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Created Exams</h1>
          {exams.length === 0 ? (
            <p>Loading...</p>
          ) : (
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
                    <th>Creation Time</th>
                    <th>Last Update</th>
                    <th>Published</th>
                    <th>Register Needs Confirmation</th>
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
                        <td>{exam.start_of_exam}</td>
                        <td>{exam.end_of_exam}</td>
                        <td>{exam.total_score}</td>
                        <td>{exam.creation_time}</td>
                        <td>{exam.last_update}</td>
                        <td>{exam.published ? "YES" : "NO"}</td>
                        <td>{exam.needs_confirmation ? "YES" : "NO"}</td>
                        <td>
                          <Link to={programRoutes.updateExam(exam.exam_id)}>
                            edit exam
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
                prefix={programRoutes.indexCreatedExams()}
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CreatedExamsPage;
