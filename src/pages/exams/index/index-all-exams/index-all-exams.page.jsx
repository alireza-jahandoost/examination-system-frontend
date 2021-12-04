import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import { Container, Row, Col } from "react-bootstrap";
import IndexExamHeader from "./index-exams-header.component";
import Search from "./search.component";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import useAsyncError from "../../../../hooks/useAsyncError";
import { examsIndexRequest } from "../../../../services/exams/exams.service";
import ExamCard from "../../../../components/exam-card/exam-card.component";
import ExamDescription from "../../../../components/exam-description/exam-description.component";
import { ExamInfoProvider } from "../../../../contexts/exam-info-context/exam-info.context";
import { useMountedState } from "react-use";

const IndexAllExams = () => {
  const [exams, setExams] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [isFinished, setIsFinished] = useState(false);
  const [shownExamId, setShownExamId] = useState(-1);
  const isMounted = useMountedState();
  const { removeUserInfo } = useContext(AuthenticationContext);
  const throwError = useAsyncError();
  const history = useHistory();
  const location = useLocation();

  const onExamDescriptionClose = () => {
    setShownExamId(-1);
  };

  useEffect(() => {
    if (searchQuery !== "") {
      history.push({
        search: "?" + new URLSearchParams({ search: searchQuery }).toString(),
      });
    } else {
      history.push({});
    }
  }, [searchQuery, history]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      return;
    }
    const currentQuery = new URLSearchParams(location.search).get("search");
    if (currentQuery) {
      setSearchQuery(currentQuery);
    } else {
      setSearchQuery("");
    }
  }, [location.search, searchQuery]);

  const fetchExams = async () => {
    try {
      const response = await examsIndexRequest(page, searchQuery);
      const { data, meta } = await response.data;
      if (isMounted()) {
        setIsFinished(meta.current_page === meta.last_page);
        setPage((prevPage) => prevPage + 1);
        setExams((prevExams) => [...prevExams, ...data.exams]);
        setIsFetching(false);
      }
    } catch (e) {
      switch (Number(e?.response?.status)) {
        case 401:
          removeUserInfo();
          break;
        default:
          throwError(e);
      }
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchExams, isFinished);

  useEffect(() => {
    setIsFetching(true);
  }, [setIsFetching]);

  const changeExamId = (examId) => {
    setShownExamId(examId);
  };

  const researchExam = () => {
    setExams([]);
    setPage(1);
    setIsFinished(false);
    setIsFetching(true);
  };

  if (searchQuery === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <IndexExamHeader />
        <Container className="p-5">
          <Search
            value={searchQuery}
            changeValue={(newValue) => {
              setSearchQuery(newValue);
            }}
            handleClick={researchExam}
          />
          <div className="mt-5">
            <Row>
              {exams.length === 0 && isFinished ? (
                <p className="lead">no exam found that match "{searchQuery}"</p>
              ) : (
                exams.map((exam) => {
                  return (
                    <Col key={`exam-${exam.exam_id}`} md={6} lg={4}>
                      <ExamCard
                        className="mt-4"
                        title={exam.exam_name}
                        handleMoreDetails={() => changeExamId(exam.exam_id)}
                      />
                    </Col>
                  );
                })
              )}
            </Row>
          </div>
          {isFetching && <div>Loading...</div>}
        </Container>
      </div>
      {shownExamId !== -1 && (
        <ExamInfoProvider examId={shownExamId}>
          <ExamDescription onExamDescriptionClose={onExamDescriptionClose} />
        </ExamInfoProvider>
      )}
    </>
  );
};

export default IndexAllExams;
