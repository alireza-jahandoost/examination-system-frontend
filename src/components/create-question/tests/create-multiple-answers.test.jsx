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

describe("create multiple answer questions", () => {
  test("user can create a multiple answer question with options", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.multipleAnswer,
    ]);
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

    // add options
    const addOptionsButton = screen.getByRole("button", {
      name: /new option/i,
    });

    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    // end

    // fill options
    const optionTextFields = screen.getAllByRole("textbox", {
      name: /question option/i,
    });
    userEvent.clear(optionTextFields[0]);
    userEvent.clear(optionTextFields[1]);
    userEvent.clear(optionTextFields[2]);

    const option1 = "option 1 option 1";
    const option2 = "option 2 option 2";
    const option3 = "option 3 option 3";

    userEvent.type(optionTextFields[0], option1);
    userEvent.type(optionTextFields[1], option2);
    userEvent.type(optionTextFields[2], option3);

    const correctRadios = screen.getAllByRole("radio", {
      name: /correct answer/i,
    });
    userEvent.click(correctRadios[0]);
    userEvent.click(correctRadios[2]);
    // end

    // check selected answers
    expect(correctRadios[0]).toBeChecked();
    expect(correctRadios[1]).not.toBeChecked();
    expect(correctRadios[2]).toBeChecked();
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });

  test("user can create a multiple answer question without options", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.multipleAnswer,
    ]);
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
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });

  test("user can remove an option before creating the question", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.multipleAnswer,
    ]);
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

    // add options
    const addOptionsButton = screen.getByRole("button", {
      name: /new option/i,
    });

    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    // end

    // fill options
    const optionTextFields = screen.getAllByRole("textbox", {
      name: /question option/i,
    });
    userEvent.clear(optionTextFields[0]);
    userEvent.clear(optionTextFields[1]);
    userEvent.clear(optionTextFields[2]);

    const option1 = "option 1 option 1";
    const option2 = "option 2 option 2";
    const option3 = "option 3 option 3";

    userEvent.type(optionTextFields[0], option1);
    userEvent.type(optionTextFields[1], option2);
    userEvent.type(optionTextFields[2], option3);

    const correctRadios = screen.getAllByRole("radio", {
      name: /correct answer/i,
    });
    userEvent.click(correctRadios[0]);
    // end

    // remove second option
    const deleteOptionButton = screen.getAllByRole("button", {
      name: /delete option/i,
    })[1];
    userEvent.click(deleteOptionButton);
    await waitFor(() =>
      expect(
        screen.getAllByRole("textbox", { name: /question option/i })
      ).toHaveLength(2)
    );
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });

  test("user can change an option before creating the question", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.multipleAnswer,
    ]);
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

    // add options
    const addOptionsButton = screen.getByRole("button", {
      name: /new option/i,
    });

    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    userEvent.click(addOptionsButton);
    // end

    // fill options
    const optionTextFields = screen.getAllByRole("textbox", {
      name: /question option/i,
    });
    userEvent.clear(optionTextFields[0]);
    userEvent.clear(optionTextFields[1]);
    userEvent.clear(optionTextFields[2]);

    const option1 = "option 1 option 1";
    const option2 = "option 2 option 2";
    const option3 = "option 3 option 3";

    userEvent.type(optionTextFields[0], option1);
    userEvent.type(optionTextFields[1], option2);
    userEvent.type(optionTextFields[2], option3);

    const correctRadios = screen.getAllByRole("radio", {
      name: /correct answer/i,
    });
    userEvent.click(correctRadios[0]);
    // end

    // change second option
    const option2new = option2 + "new new";
    userEvent.clear(optionTextFields[1]);
    userEvent.type(optionTextFields[1], option2new);
    expect(optionTextFields[1]).toHaveValue(option2new);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
});
