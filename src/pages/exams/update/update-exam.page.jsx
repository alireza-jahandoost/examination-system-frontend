import { useParams } from "react-router-dom";

const UpdateExamPage = () => {
  const { examId } = useParams();

  return <h1> Update Exam {examId} </h1>;
};

export default UpdateExamPage;
