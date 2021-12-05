import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation, Redirect, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import RecordsTable from "../../../../components/records-table/records-table.component";
import useAsyncError from "../../../../hooks/useAsyncError";
import ProfileContainer from "../../../../components/profile-container/profile-container.component";
import Pagination from "../../../../components/pagination/pagination.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { indexParticipantsRequest } from "../../../../services/participants/participants.service";

const IndexParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { examId } = useParams();
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
    <ProfileContainer>
      <h1>Participants</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : participants.length > 0 ? (
        <>
          <RecordsTable>
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
              {participants.map((participant, idx) => {
                return (
                  <tr key={participant.participant_id}>
                    <td>{idx + 1}</td>
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
          </RecordsTable>
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            prefix={programRoutes.indexParticipants()}
          />
        </>
      ) : (
        <p className="lead"> no one have participated in this exam yet </p>
      )}
    </ProfileContainer>
  );
};

export default IndexParticipantsPage;
