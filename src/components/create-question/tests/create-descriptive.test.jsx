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

describe("create descriptive questions", () => {
  test("user can create a new descriptive question", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion examId={1} addQuestion={addQuestion} />));

    const selectInput = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(selectInput, [selectValues.descriptive]);

    const questionText = screen.getByRole("textbox", {
      name: /question text/i,
    });
    const value = "new new new value";
    userEvent.clear(questionText);
    userEvent.type(questionText, value);

    const questionScore = screen.getByRole("spinbutton", {
      name: /question score/i,
    });
    const score = "20";
    userEvent.clear(questionScore);
    userEvent.type(questionScore, score);

    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
});
