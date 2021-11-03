import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";

export const selectValues = {
  descriptive: "1",
  fillTheBlank: "2",
  multipleAnswer: "3",
  selectTheAnswer: "4",
  trueOrFalse: "5",
  ordering: "6",
};

export const wrapper = (ui) => (
  <QuestionTypesProvider>{ui}</QuestionTypesProvider>
);
