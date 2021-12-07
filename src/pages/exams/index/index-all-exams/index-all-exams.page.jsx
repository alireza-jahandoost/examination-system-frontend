import { useState, useMemo, useEffect, useContext } from "react";
import { useHistory, Redirect, useLocation, Link } from "react-router-dom";
import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import ProfileContainer from "../../../../components/profile-container/profile-container.component";
import { Button } from "react-bootstrap";
import Search from "./search.component";
import useAsyncError from "../../../../hooks/useAsyncError";
import { examsIndexRequest } from "../../../../services/exams/exams.service";
import { useMountedState } from "react-use";
import programRoutes from "../../../../constants/program-routes.constant";
import Pagination from "../../../../components/pagination/pagination.component";
import RecordsTable from "../../../../components/records-table/records-table.component";
import { convertFromUTCToHumanReadable } from "../../../../utilities/dateAndTime.utility";
import {
  getParams,
  createPath,
  createSearch,
} from "../../../../utilities/url.utility";

const IndexAllExams = () => {
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [research, setResearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const { removeUserInfo } = useContext(AuthenticationContext);
  const location = useLocation();
  const page = useMemo(() => {
    return Number(getParams({ url: location.search }).page) || 1;
  }, [location]);
  const isMounted = useMountedState();
  const throwError = useAsyncError();
  const history = useHistory();

  useEffect(() => {
    if (
      (Number(page) === Number(currentPage) && research === false) ||
      isLoading ||
      searchQuery === undefined
    ) {
      return;
    }
    setIsLoading(true);
    setResearch(false);
    examsIndexRequest(page, searchQuery)
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
          setIsContextLoaded(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted()) {
          switch (Number(err?.response?.status)) {
            case 401:
              removeUserInfo();
              break;
            default:
              throwError(err);
          }
          setIsContextLoaded(true);
          setIsLoading(false);
        }
      });
  }, [
    page,
    isMounted,
    searchQuery,
    currentPage,
    isLoading,
    removeUserInfo,
    throwError,
    research,
  ]);

  useEffect(() => {
    if (searchQuery === undefined) {
      return;
    }
    const search = {};
    if (page > 1) {
      search.page = page;
    }
    if (searchQuery !== "") {
      search.search = searchQuery;
    }
    history.push({
      search: createSearch({ params: search }),
    });
  }, [searchQuery, history, page]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      return;
    }
    const currentQuery = getParams({ url: location.search }).search;
    if (currentQuery) {
      setSearchQuery(currentQuery);
    } else {
      setSearchQuery("");
    }
  }, [location.search, searchQuery]);

  if (
    isContextLoaded &&
    !isLoading &&
    (Number(page) > Number(numberOfPages) || Number(page) <= 0)
  ) {
    return (
      <Redirect
        to={createPath({
          pathName: programRoutes.indexAllExams(),
          params: { search: searchQuery },
        })}
      />
    );
  }

  const researchExam = () => {
    setExams([]);
    setCurrentPage(1);
    setIsContextLoaded(false);
    setResearch(true);
  };

  if (searchQuery === undefined || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ProfileContainer>
      <h1>All Exams</h1>
      <Search
        value={searchQuery}
        changeValue={(newVal) => setSearchQuery(newVal)}
        handleClick={researchExam}
      />
      {exams.length > 0 ? (
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
                <th>Register Needs Confirmation</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => {
                return (
                  <tr key={exam.exam_id}>
                    <td>{idx + 1 + (currentPage - 1) * 18}</td>
                    <td>{exam.exam_name}</td>
                    <td>{exam.exam_description}</td>
                    <td>{convertFromUTCToHumanReadable(exam.start_of_exam)}</td>
                    <td>{convertFromUTCToHumanReadable(exam.end_of_exam)}</td>
                    <td>{exam.total_score}</td>
                    <td>{convertFromUTCToHumanReadable(exam.creation_time)}</td>
                    <td>{convertFromUTCToHumanReadable(exam.last_update)}</td>
                    <td>{exam.needs_confirmation ? "YES" : "NO"}</td>
                    <td>
                      <div>
                        <Link
                          to={programRoutes.examiningOverview(exam.exam_id)}
                        >
                          <Button variant="success"> more details</Button>
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
            prefix={createPath({
              pathName: location.pathname,
              params: getParams({ url: location.search, except: ["page"] }),
            })}
          />
        </>
      ) : (
        <p className="lead">
          {" "}
          {searchQuery !== "" && searchQuery !== undefined
            ? `no exam found that match "${searchQuery}"`
            : "there is not any exam to show"}{" "}
        </p>
      )}
    </ProfileContainer>
  );
};

export default IndexAllExams;
