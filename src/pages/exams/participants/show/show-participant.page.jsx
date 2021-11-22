import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Sidebar from "../../../../components/sidebar/sidebar.component";
import ParticipantAnswer from "../../../../components/participant-answer/participant-answer.component";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { questionsIndexRequest } from "../../../../services/questions/questions.service";
// TODO: get questions of this exam from server and show with answer with answer-question component

// TODO: implement handler and mock of grading the questions

// TODO: implement the service of grading the questions

// TODO: get the grade of question and send it to server
const ShowParticipantPage = () => {
  const { examId, participantId } = useParams();
  const [questions, setQuestions] = useState([]);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!examId || isNaN(examId) || !token) {
      return;
    }
    questionsIndexRequest(examId, token)
      .then((response) => response.data.data)
      .then(({ questions: receivedQuestions }) =>
        setQuestions(receivedQuestions)
      )
      .catch((err) => console.error(err));
  }, [examId, token]);

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Participant Answers</h1>
          <div>
            {questions.map((question) => (
              <ParticipantAnswer
                key={question.question_id}
                participantId={participantId}
                examId={examId}
                questionId={question.question_id}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShowParticipantPage;
