import { Context as ResponsiveContext } from "react-responsive";
import { act } from "@testing-library/react";
import { rest } from "msw";

import { server } from "../mocks/server";
import urlRoutes from "../constants/urlRoutes.constant";
import "../mocks/server";

export const wrapWithWidth = (component, size) => {
  return (
    <ResponsiveContext.Provider value={{ width: size }}>
      {component}
    </ResponsiveContext.Provider>
  );
};

export const wait = (time) =>
  act(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  });

/*
  input:
  examId: id of exam
  start: start time for exam - Date obj
  end: end time for exam - Date obj

  operation: reset the handler with these times for this exam
   */
export const asignExamShowStartAndEnd = (examId, start, end) => {
  const formatted_start_date =
    start.getFullYear() +
    "-" +
    (start.getMonth() + 1) +
    "-" +
    start.getDate() +
    " " +
    start.getHours() +
    ":" +
    start.getMinutes() +
    ":" +
    start.getSeconds();

  let formatted_end_date =
    end.getFullYear() +
    "-" +
    (end.getMonth() + 1) +
    "-" +
    end.getDate() +
    " " +
    end.getHours() +
    ":" +
    end.getMinutes() +
    ":" +
    end.getSeconds();

  server.resetHandlers(
    rest.get(urlRoutes["exams.show"](1), (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            exam: {
              exam_id: 1,
              exam_name: "Dolorum repellendus fuga nihil illo.",
              needs_confirmation: false,
              has_password: false,
              start_of_exam: formatted_start_date,
              end_of_exam: formatted_end_date,
              total_score: 100,
              creation_time: "2021-09-24T15:40:39.000000Z",
              last_update: "2021-09-24T15:40:39.000000Z",
              owner_id: 33,
              owner_name: "Mrs. Alanna Bogan Jr.",
              owner_link: "http://localhost:8000/api/users/33",
            },
          },
        })
      );
    })
  );
};
