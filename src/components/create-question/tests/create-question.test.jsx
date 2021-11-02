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

describe("create fill the blank questions", () => {
  test("user can create fill the blank questions", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.fillTheBlank]);
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

    // add answers
    const addAnswerButton = screen.getByRole("button", { name: /new answer/i });
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);

    const answer1 = "answer 1 answer 1";
    const answer2 = "answer 2 answer 2";
    const answer3 = "answer 3 answer 3";
    // end

    // fill answers
    const answerInputs = screen.getAllByRole("textbox", {
      name: /question answer/i,
    });

    userEvent.clear(answerInputs[0]);
    userEvent.clear(answerInputs[1]);
    userEvent.clear(answerInputs[2]);

    userEvent.type(answerInputs[0], answer1);
    userEvent.type(answerInputs[1], answer2);
    userEvent.type(answerInputs[2], answer3);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
  test("user can create fill the blank questions without any answer", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.fillTheBlank]);
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
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
  test("user can delete a specific answer", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.fillTheBlank]);
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

    // add answers
    const addAnswerButton = screen.getByRole("button", { name: /new answer/i });
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);

    const answer1 = "answer 1 answer 1";
    const answer2 = "answer 2 answer 2";
    const answer3 = "answer 3 answer 3";
    // end

    // fill answers
    const answerInputs = screen.getAllByRole("textbox", {
      name: /question answer/i,
    });

    userEvent.clear(answerInputs[0]);
    userEvent.clear(answerInputs[1]);
    userEvent.clear(answerInputs[2]);

    userEvent.type(answerInputs[0], answer1);
    userEvent.type(answerInputs[1], answer2);
    userEvent.type(answerInputs[2], answer3);
    // end

    // delete second answer
    const deleteAnswersButton = screen.getAllByRole("button", {
      name: /delete answer/i,
    });
    userEvent.click(deleteAnswersButton[1]);
    // end

    // check answer deleted
    await waitFor(() =>
      expect(
        screen.getAllByRole("textbox", { name: /question answer/i })
      ).toHaveLength(2)
    );
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
  test("user can change the answer value before creating", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.fillTheBlank]);
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

    // add answers
    const addAnswerButton = screen.getByRole("button", { name: /new answer/i });
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);

    const answer1 = "answer 1 answer 1";
    const answer2 = "answer 2 answer 2";
    const answer3 = "answer 3 answer 3";
    // end

    // fill answers
    const answerInputs = screen.getAllByRole("textbox", {
      name: /question answer/i,
    });

    userEvent.clear(answerInputs[0]);
    userEvent.clear(answerInputs[1]);
    userEvent.clear(answerInputs[2]);

    userEvent.type(answerInputs[0], answer1);
    userEvent.type(answerInputs[1], answer2);
    userEvent.type(answerInputs[2], answer3);
    // end

    // change second answer
    const newAnswer2 = "new new new new new new";
    userEvent.clear(answerInputs[1]);
    userEvent.type(answerInputs[1], newAnswer2);
    // end

    // check answer updated
    expect(answerInputs[1]).toHaveValue(newAnswer2);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
});

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

describe("create select the answer questions", () => {
  test("user can create a select the answer question without options", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.selectTheAnswer,
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

  test("user can create a select the answer question with options", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.selectTheAnswer,
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
    userEvent.click(correctRadios[1]);
    // end

    // check answer of options
    await waitFor(() => expect(correctRadios[0]).not.toBeChecked());
    expect(correctRadios[1]).toBeChecked();
    expect(correctRadios[2]).not.toBeChecked();
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });

  test("user can delete an option before creating the question", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [
      selectValues.selectTheAnswer,
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
    userEvent.click(correctRadios[1]);
    // end

    // check answer of options
    await waitFor(() => expect(correctRadios[0]).not.toBeChecked());
    expect(correctRadios[1]).toBeChecked();
    expect(correctRadios[2]).not.toBeChecked();
    // end

    // delete second option
    const deleteButtons = screen.getAllByRole("button", {
      name: /delete option/i,
    });
    userEvent.click(deleteButtons[1]);
    // end

    // check second option is deleted
    await waitFor(() =>
      expect(
        screen.getAllByRole("textbox", { name: /question option/i })
      ).toHaveLength(2)
    );

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
      selectValues.selectTheAnswer,
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
    userEvent.click(correctRadios[1]);
    // end

    // check answer of options
    await waitFor(() => expect(correctRadios[0]).not.toBeChecked());
    expect(correctRadios[1]).toBeChecked();
    expect(correctRadios[2]).not.toBeChecked();
    // end

    // change an option value
    const changedOption2 = option2 + "new new update";
    userEvent.clear(optionTextFields[1]);
    userEvent.type(optionTextFields[1], changedOption2);
    // end

    // check for new value
    expect(optionTextFields[1]).toHaveValue(changedOption2);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    await waitFor(() => expect(addQuestion).toHaveBeenCalledTimes(1));
  });
});

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

describe("create ordering questions", () => {
  test("create question without answers", async () => {});
  test("create question with answers", async () => {});
  test("delete an answer before creating", async () => {});
  test("change an answer before creating", async () => {});
});

describe("check errors", () => {
  test("check question text error", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion examId={1} addQuestion={addQuestion} />));

    const selectInput = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(selectInput, [selectValues.descriptive]);

    const questionText = screen.getByRole("textbox", {
      name: /question text/i,
    });
    const value = "";
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

    await waitFor(() =>
      expect(
        screen.getByText(/the question text field is required/i)
      ).toBeInTheDocument()
    );

    expect(addQuestion).toHaveBeenCalledTimes(0);
  });

  test("check question score error", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion examId={1} addQuestion={addQuestion} />));

    const selectInput = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(selectInput, [selectValues.descriptive]);

    const questionText = screen.getByRole("textbox", {
      name: /question text/i,
    });
    const value = "value value value";
    userEvent.clear(questionText);
    userEvent.type(questionText, value);

    const questionScore = screen.getByRole("spinbutton", {
      name: /question score/i,
    });
    const score = "";
    userEvent.clear(questionScore);
    userEvent.type(questionScore, score);

    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);

    await waitFor(() =>
      expect(
        screen.getByText(/the question score field is required/i)
      ).toBeInTheDocument()
    );

    expect(addQuestion).toHaveBeenCalledTimes(0);
  });

  test("check error of question answers part", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.fillTheBlank]);
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

    // add answers
    const addAnswerButton = screen.getByRole("button", { name: /new answer/i });
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);
    userEvent.click(addAnswerButton);

    const answer1 = "answer 1 answer 1";
    // const answer2 = "answer 2 answer 2";
    const answer3 = "answer 3 answer 3";
    // end

    // fill answers
    const answerInputs = screen.getAllByRole("textbox", {
      name: /question answer/i,
    });

    userEvent.clear(answerInputs[0]);
    userEvent.clear(answerInputs[1]);
    userEvent.clear(answerInputs[2]);

    userEvent.type(answerInputs[0], answer1);
    // userEvent.type(answerInputs[1], answer2);
    userEvent.type(answerInputs[2], answer3);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    userEvent.click(createButton);
    // end

    expect(
      await screen.findByText(/you must fill all the states/i)
    ).toBeInTheDocument();
    expect(addQuestion).toHaveBeenCalledTimes(0);
  });

  test("check error of question options part", async () => {
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
    // const option2 = "option 2 option 2";
    const option3 = "option 3 option 3";

    userEvent.type(optionTextFields[0], option1);
    // userEvent.type(optionTextFields[1], option2);
    userEvent.type(optionTextFields[2], option3);

    const correctRadios = screen.getAllByRole("radio", {
      name: /correct answer/i,
    });
    userEvent.click(correctRadios[0]);
    // end

    // click create button
    const createButton = screen.getAllByRole("button", { name: /create/i })[1];
    expect(createButton).toBeEnabled();
    userEvent.click(createButton);
    // end

    expect(
      await screen.findByText(/you must fill all the states/i)
    ).toBeInTheDocument();
    expect(addQuestion).toHaveBeenCalledTimes(0);
  });
});
