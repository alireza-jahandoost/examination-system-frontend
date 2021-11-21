import { Context as ResponsiveContext } from "react-responsive";
import { act } from "@testing-library/react";
import { rest } from "msw";

import { server, handlers } from "../mocks/server";
import apiRoutes from "../constants/api-routes.constant";
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
export const asignExamShowStartAndEnd = (
  examId,
  start,
  end,
  hasPassword = false
) => {
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
    rest.get(apiRoutes.exams.showExam(examId), (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            exam: {
              exam_id: 1,
              exam_name: "Dolorum repellendus fuga nihil illo.",
              needs_confirmation: false,
              has_password: hasPassword,
              start_of_exam: formatted_start_date,
              end_of_exam: formatted_end_date,
              total_score: 100,
              creation_time: "2021-09-24T15:40:39.000000Z",
              last_update: "2021-09-24T15:40:39.000000Z",
              owner_id: 33,
              owner_name: "Mrs. Alanna Bogan Jr.",
              owner_link: "http://localhost:8000/api/users/33",
              is_registered: false,
            },
          },
        })
      );
    }),
    ...handlers
  );
};

const emptyExams = {
  data: {
    exams: [],
  },
  links: {
    first: "http://localhost:8000/api/exams?page=1",
    last: "http://localhost:8000/api/exams?page=1",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: "http://localhost:8000/api/exams?page=1",
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost:8000/api/exams?page=1",
        label: "1",
        active: false,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    path: "http://localhost:8000/api/exams",
    per_page: 18,
    to: null,
    total: 0,
  },
};

export const emptyParticipatedExams = () => {
  server.resetHandlers(
    rest.get(apiRoutes.participants.participatedExams(), (req, res, ctx) => {
      return res(ctx.json(emptyExams));
    }),
    ...handlers
  );
};

export const emptyCreatedExams = () => {
  server.resetHandlers(
    rest.get(apiRoutes.exams.indexCreatedExams(), (req, res, ctx) => {
      return res(ctx.json(emptyExams));
    }),
    ...handlers
  );
};

export const randomString = (length = 8) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
