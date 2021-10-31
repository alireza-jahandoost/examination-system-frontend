import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { EditQuestionContext } from "../../../contexts/edit-question-context/edit-question.context";
import QuestionAnswers from "../question-answers.component";

describe("check question answers for not created answers", () => {
  const answers = [
    { value: "first answer", id: 1 },
    { value: "second answer", id: 2 },
    { value: "third answer", id: 3 },
  ];

  test("for every answer, there must be an input with its value", () => {
    const deleteAnswer = jest.fn();
    const addAnswer = jest.fn();
    const changeAnswer = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: answers,
          addState: addAnswer,
          deleteState: deleteAnswer,
          changeState: changeAnswer,
        }}
      >
        <QuestionAnswers />
      </EditQuestionContext.Provider>
    );

    for (const current of answers) {
      expect(screen.getByDisplayValue(current.value)).toBeInTheDocument();
    }
  });

  test("on clicking on create answer, 'addAnswer' must be called", async () => {
    const deleteAnswer = jest.fn();
    const addAnswer = jest.fn();
    const changeAnswer = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: answers,
          addState: addAnswer,
          deleteState: deleteAnswer,
          changeState: changeAnswer,
        }}
      >
        <QuestionAnswers />
      </EditQuestionContext.Provider>
    );

    const addAnswerButton = screen.getByRole("button", {
      name: /create a new answer/i,
    });
    expect(addAnswerButton).toBeEnabled();

    userEvent.click(addAnswerButton);
    expect(addAnswer).toHaveBeenCalledTimes(1);
  });

  test("on clicking on delete button, the 'deleteAnswer' with answer id must be called", async () => {
    const deleteAnswer = jest.fn();
    const addAnswer = jest.fn();
    const changeAnswer = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: answers,
          addState: addAnswer,
          deleteState: deleteAnswer,
          changeState: changeAnswer,
        }}
      >
        <QuestionAnswers />
      </EditQuestionContext.Provider>
    );

    const firstDeleteButton = screen.getAllByRole("button", {
      name: /delete answer/i,
    })[0];
    expect(firstDeleteButton).toBeEnabled();
    userEvent.click(firstDeleteButton);
    expect(deleteAnswer).toHaveBeenCalledTimes(1);
    expect(deleteAnswer).toHaveBeenCalledWith(answers[0].id);
  });

  test("if an answer changed, the 'changeAnswer' must be called with new value", () => {
    const deleteAnswer = jest.fn();
    const addAnswer = jest.fn();
    const changeAnswer = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: answers,
          addState: addAnswer,
          deleteState: deleteAnswer,
          changeState: changeAnswer,
        }}
      >
        <QuestionAnswers />
      </EditQuestionContext.Provider>
    );

    const newValue = "new new value";
    const firstInput = screen.getAllByRole("textbox")[0];
    userEvent.clear(firstInput);
    userEvent.type(firstInput, newValue);

    expect(changeAnswer).toHaveBeenCalledTimes(1 + newValue.length);
  });

  test("if the readOnly property was true, user can not add or delete answers", async () => {
    const deleteAnswer = jest.fn();
    const addAnswer = jest.fn();
    const changeAnswer = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: answers,
          addState: addAnswer,
          deleteState: deleteAnswer,
          changeState: changeAnswer,
        }}
      >
        <QuestionAnswers readOnly={true} />
      </EditQuestionContext.Provider>
    );

    const newValue = "new new value";
    const firstInput = screen.getAllByRole("textbox")[0];
    userEvent.clear(firstInput);
    userEvent.type(firstInput, newValue);

    expect(changeAnswer).toHaveBeenCalledTimes(0);

    const firstDeleteButton = screen.getAllByRole("button", {
      name: /delete answer/i,
    })[0];
    expect(firstDeleteButton).toBeDisabled();
    userEvent.click(firstDeleteButton);
    expect(deleteAnswer).toHaveBeenCalledTimes(0);
  });
});
