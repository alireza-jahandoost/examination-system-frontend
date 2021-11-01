import {
  render,
  waitFor,
  screen,
} from "../../../test-utils/testing-library-utils";
import CreateQuestion from "../create-question.component";
import userEvent from "@testing-library/user-event";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";
import { wait } from "../../../utilities/tests.utility";

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
});
