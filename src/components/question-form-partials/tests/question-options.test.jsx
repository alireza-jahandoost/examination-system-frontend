import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { EditQuestionContext } from "../../../contexts/edit-question-context/edit-question.context";
import QuestionOptions from "../question-options.component";

describe("check question options for not created options", () => {
  const options = [
    { value: "first option", id: 1, answer: true },
    { value: "second option", id: 2, answer: false },
    { value: "third option", id: 3, answer: true },
  ];

  test("options given from context will be displayed", () => {
    const deleteOption = jest.fn();
    const addOption = jest.fn();
    const changeOption = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: options,
          addState: addOption,
          deleteState: deleteOption,
          changeState: changeOption,
        }}
      >
        <QuestionOptions />
      </EditQuestionContext.Provider>
    );

    for (const current of options) {
      expect(screen.getByDisplayValue(current.value)).toBeInTheDocument();
    }
  });

  test("on clicking on delete button, 'deleteOption' must be called with the option id", () => {
    const deleteOption = jest.fn();
    const addOption = jest.fn();
    const changeOption = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: options,
          addState: addOption,
          deleteState: deleteOption,
          changeState: changeOption,
        }}
      >
        <QuestionOptions />
      </EditQuestionContext.Provider>
    );

    const deleteButton = screen.getAllByRole("button", {
      name: /delete option/i,
    })[1];
    userEvent.click(deleteButton);

    expect(deleteOption).toHaveBeenCalledTimes(1);
    expect(deleteOption).toHaveBeenCalledWith(options[1].id);
  });

  test("on adding an option, 'addOption' must be called", () => {
    const deleteOption = jest.fn();
    const addOption = jest.fn();
    const changeOption = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: options,
          addState: addOption,
          deleteState: deleteOption,
          changeState: changeOption,
        }}
      >
        <QuestionOptions />
      </EditQuestionContext.Provider>
    );

    const addOptionButton = screen.getByRole("button", {
      name: /create a new option/i,
    });
    expect(addOptionButton).toBeEnabled();
    userEvent.click(addOptionButton);

    expect(addOption).toHaveBeenCalledTimes(1);
  });

  test("if the readOnly property was true, user can not delete or add any option", () => {
    const deleteOption = jest.fn();
    const addOption = jest.fn();
    const changeOption = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: options,
          addState: addOption,
          deleteState: deleteOption,
          changeState: changeOption,
        }}
      >
        <QuestionOptions readOnly={true} />
      </EditQuestionContext.Provider>
    );

    const addOptionButton = screen.getByRole("button", {
      name: /create a new option/i,
    });
    expect(addOptionButton).toBeDisabled();
    userEvent.click(addOptionButton);

    expect(addOption).toHaveBeenCalledTimes(0);

    const deleteButton = screen.getAllByRole("button", {
      name: /delete option/i,
    })[1];
    userEvent.click(deleteButton);

    expect(deleteOption).toHaveBeenCalledTimes(0);
  });

  test("if an option changed, the changeOption with new values must be called", () => {
    const deleteOption = jest.fn();
    const addOption = jest.fn();
    const changeOption = jest.fn();
    render(
      <EditQuestionContext.Provider
        value={{
          notCreatedStates: options,
          addState: addOption,
          deleteState: deleteOption,
          changeState: changeOption,
        }}
      >
        <QuestionOptions />
      </EditQuestionContext.Provider>
    );

    const newValue = "new new new";
    const firstOptionInput = screen.getAllByRole("textbox")[0];
    userEvent.clear(firstOptionInput);
    userEvent.type(firstOptionInput, newValue);

    expect(changeOption).toHaveBeenCalledTimes(1 + newValue.length);

    const secondCorrectAnswerRadio = screen.getAllByRole("radio")[2];
    userEvent.click(secondCorrectAnswerRadio);
    expect(changeOption).toHaveBeenCalledWith({
      id: 2,
      answer: true,
      from: "notCreated",
    });
  });
});
