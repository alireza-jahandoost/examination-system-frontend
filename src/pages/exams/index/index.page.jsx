import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./header.component";
import Search from "./search.component";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { examsIndexRequest } from "../../../services/exams/exams.service";
import ExamCard from "../../../components/exam-card/exam-card.component";
import ExamDescription from "../../../components/exam-description/exam-description.component";

const ExamsIndex = () => {
  const [exams, setExams] = useState([]);
  const [page, setPage] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [shownExamId, setShownExamId] = useState(-1);

  const onExamDescriptionClose = () => {
    setShownExamId(-1);
  };

  const fetchExams = async () => {
    const response = await examsIndexRequest(page);
    const { data, meta } = await response.data;
    setIsFinished(meta.current_page === meta.last_page);
    setPage((prevPage) => prevPage + 1);
    setExams((prevExams) => [...prevExams, ...data.exams]);
    setIsFetching(false);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchExams, isFinished);

  useEffect(() => {
    setIsFetching(true);
  }, [setIsFetching]);

  const changeExamId = (examId) => {
    setShownExamId(examId);
  };

  return (
    <>
      <div>
        <Header />
        <Container className="p-5">
          <Search />
          <div className="mt-5">
            <Row>
              {exams.map((exam) => {
                return (
                  <Col key={`exam-${exam.exam_id}`} md={6} lg={4}>
                    <ExamCard
                      className="mt-4"
                      title={exam.exam_name}
                      handleMoreDetails={() => changeExamId(exam.exam_id)}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
          {isFetching && <div>Loading...</div>}
        </Container>
      </div>
      {shownExamId !== -1 && (
        <ExamDescription
          examId={shownExamId}
          onExamDescriptionClose={onExamDescriptionClose}
        />
      )}
    </>
  );
};

export default ExamsIndex;
