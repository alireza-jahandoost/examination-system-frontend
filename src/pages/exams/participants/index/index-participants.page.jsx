import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation, Redirect, useParams } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { useMountedState } from "react-use";
import Sidebar from "../../../../components/sidebar/sidebar.component";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { indexParticipantsRequest } from "../../../../services/participants/participants.service";

const IndexParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { token } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { examId } = useParams();
  const page = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 1;
  }, [location]);
  const isMounted = useMountedState();
  console.log(window.location.href);

  useEffect(() => {
    if (Number(page) === Number(currentPage) || isLoading) {
      return;
    }
    setIsLoading(true);
    indexParticipantsRequest(examId, token, page)
      .then((response) => response.data)
      .then(({ data, meta }) => {
        if (isMounted()) {
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
      .catch((err) => console.error(err));
  }, [page, token, isMounted, currentPage, isLoading, examId]);

  if (
    !isLoading &&
    (Number(page) > Number(numberOfPages) || Number(page) <= 0)
  ) {
    return <Redirect to={programRoutes.indexParticipants(examId)} />;
  }

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Participants</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : participants.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Is Confirmed</th>
                    <th>Grade</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => {
                    return (
                      <tr key={participant.participant_id}>
                        <td>{participant.participant_id}</td>
                        <td>{participant.status}</td>
                        <td>{participant.confirmed ? "YES" : "NO"}</td>
                        <td>{participant.grade}</td>
                        <td>
                          <Link
                            to={programRoutes.showParticipant(
                              examId,
                              participant.participant_id
                            )}
                          >
                            see answers of this participant
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
                prefix={programRoutes.indexParticipants()}
              />
            </>
          ) : (
            <p className="lead"> no one have participated in this exam yet </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default IndexParticipantsPage;
