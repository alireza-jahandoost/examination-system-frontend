import {
  render,
  waitFor,
  screen,
} from "../../../test-utils/testing-library-utils";
import CreateQuestion from "../create-question.component";
import userEvent from "@testing-library/user-event";
import { wrapper, selectValues } from "./partials";

describe("create true or false questions", () => {
  test("create question with answer true", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.trueOrFalse]);
    // end

    // change question text
    const questionText = "new new new test";
    const questionTextInput = screen.getByRole("textbox", {
      name: /question text/i,
    });
    userEvent.clear(questionTextInput);
    userEvent.type(questionTextInput, questionText);
    // end

    // change question score
    const questionScore = "20";
    const questionScoreInput = screen.getByRole("spinbutton", {
      name: /question score/i,
    });
    userEvent.clear(questionScoreInput);
    userEvent.type(questionScoreInput, questionScore);
    // end

    // change answer to true
    const questionAnswer = await screen.findByRole("radio", { name: /true/i });
    userEvent.click(questionAnswer);
    expect(questionAnswer).toBeChecked();
    // end

    // click create button
    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
  test("create question with answer false", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.trueOrFalse]);
    // end

    // change question text
    const questionText = "new new new test";
    const questionTextInput = screen.getByRole("textbox", {
      name: /question text/i,
    });
    userEvent.clear(questionTextInput);
    userEvent.type(questionTextInput, questionText);
    // end

    // change question score
    const questionScore = "20";
    const questionScoreInput = screen.getByRole("spinbutton", {
      name: /question score/i,
    });
    userEvent.clear(questionScoreInput);
    userEvent.type(questionScoreInput, questionScore);
    // end

    // click create button
    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
});
