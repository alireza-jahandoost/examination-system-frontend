import { CreateQuestionProvider } from "../../contexts/create-question-context/create-question.context";
import CreateQuestionForm from "./create-question-form.component";

const CreateQuestion = ({ examId, addQuestion, readOnly = false }) => {
  return (
    <CreateQuestionProvider>
      <CreateQuestionForm
        examId={examId}
        addQuestion={addQuestion}
        readOnly={readOnly}
      />
    </CreateQuestionProvider>
  );
};

export default CreateQuestion;
