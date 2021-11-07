import {
  render,
  waitFor,
  screen,
} from "../../../test-utils/testing-library-utils";
import CreateQuestion from "../create-question.component";
import userEvent from "@testing-library/user-event";
import { wrapper, selectValues } from "./partials";
import { wait } from "../../../utilities/tests.utility";

describe("create ordering questions", () => {
  test("create question with answers", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
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
  test("create question without answers", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
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
  test("delete an answer before creating", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
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
  test("change an answer before creating", async () => {
    const addQuestion = jest.fn();
    render(wrapper(<CreateQuestion addQuestion={addQuestion} examId={1} />));

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
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

describe("check readonly property", () => {
  test("check all the textbox fields are readonly", async () => {
    const addQuestion = jest.fn();
    render(
      wrapper(
        <CreateQuestion examId={1} readOnly={true} addQuestion={addQuestion} />
      )
    );

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
    // end

    await wait(100);

    const textboxInputs = screen.getAllByRole("textbox");
    for (let i = 0; i < textboxInputs.length; i++) {
      expect(textboxInputs[i]).toHaveAttribute("readonly");
    }
  });
  test("check all the spinbutton fields are readonly", async () => {
    const addQuestion = jest.fn();
    render(
      wrapper(
        <CreateQuestion examId={1} readOnly={true} addQuestion={addQuestion} />
      )
    );

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
    // end

    await wait(100);

    const spinButtons = screen.getAllByRole("spinbutton");
    for (let i = 0; i < spinButtons.length; i++) {
      expect(spinButtons[i]).toHaveAttribute("readonly");
    }
  });
  test("check all the buttons are disabled", async () => {
    const addQuestion = jest.fn();
    render(
      wrapper(
        <CreateQuestion examId={1} readOnly={true} addQuestion={addQuestion} />
      )
    );

    // change question type
    const questionTypeSelector = await screen.findByRole("combobox", {
      name: /question type/i,
    });

    userEvent.selectOptions(questionTypeSelector, [selectValues.ordering]);
    // end

    await wait(100);

    const buttons = screen.getAllByRole("button");
    for (let i = 0; i < buttons.length; i++) {
      expect(buttons[i]).toHaveAttribute("disabled");
    }
  });
});
