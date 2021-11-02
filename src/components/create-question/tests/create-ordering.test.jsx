import {
  render,
  waitFor,
  screen,
} from "../../../test-utils/testing-library-utils";
import CreateQuestion from "../create-question.component";
import userEvent from "@testing-library/user-event";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";

const selectValues = {
  descriptive: "1",
  fillTheBlank: "2",
  multipleAnswer: "3",
  selectTheAnswer: "4",
  trueOrFalse: "5",
  ordering: "6",
};

const wrapper = (ui) => <QuestionTypesProvider>{ui}</QuestionTypesProvider>;

describe("create ordering questions", () => {
  test("create question without answers", async () => {
    expect(1).toBe(2);
  });
  test("create question with answers", async () => {
    expect(1).toBe(2);
  });
  test("delete an answer before creating", async () => {
    expect(1).toBe(2);
  });
  test("change an answer before creating", async () => {
    expect(1).toBe(2);
  });
});
