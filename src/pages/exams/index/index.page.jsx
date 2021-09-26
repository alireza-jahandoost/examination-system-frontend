import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./header.component";
import Search from "./search.component";
// import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import urlRoutes from "../../../constants/urlRoutes.constant";

import ExamCard from "./exam-card.component";

const ExamsIndex = () => {
  const [exams, setExams] = useState([]);
  const [page, setPage] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const fetchExams = async () => {
    console.log("first");
    const response = await fetch(urlRoutes["exams.index"](page));
    const { data, meta } = await response.json();
    setIsFinished(meta.current_page === meta.last_page);
    setPage((prevPage) => prevPage + 1);
    setExams((prevExams) => [...prevExams, ...data.exams]);
    setIsFetching(false);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchExams, isFinished);

  useEffect(() => {
    setIsFetching(true);
  }, [setIsFetching]);

  return (
    <div>
      <Header />
      <Container className="p-5">
        <Search />
        <div className="mt-5">
          <Row>
            {exams.map((exam) => {
              return (
                <Col key={`exam-${exam.exam_id}`} md={6} lg={4}>
                  <ExamCard title={exam.exam_name} />
                </Col>
              );
            })}
          </Row>
        </div>
        {isFetching && <div>Loading...</div>}
      </Container>
    </div>
  );
};

export default ExamsIndex;
