import { Context as ResponsiveContext } from "react-responsive";
import { act } from "@testing-library/react";
import { rest } from "msw";

import { server, handlers } from "../mocks/server";
import apiRoutes from "../constants/api-routes.constant";
import "../mocks/server";
import { error_401, error_422 } from "../mocks/errors/pure-error-bodies.error";

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

const emptyPaginatedObject = ({ route, objectName }) => {
  const data = {};
  data[objectName] = [];

  return {
    data,
    links: {
      first: `${route}?page=1`,
      last: `${route}?page=1`,
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [
        {
          url: `${route}?page=1`,
          label: "&laquo; Previous",
          active: false,
        },
        {
          url: `${route}?page=1`,
          label: "1",
          active: false,
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false,
        },
      ],
      path: route,
      per_page: 18,
      to: null,
      total: 0,
    },
  };
};

export const emptyRequest = ({ route, method, objectName }) => {
  server.resetHandlers(
    rest[method](route, (req, res, ctx) => {
      return res(ctx.json(emptyPaginatedObject({ route, objectName })));
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

export const changeRequestResponseTo401 = ({ route, method }) => {
  const { errorBody } = error_401();
  server.resetHandlers(
    rest[method](route, (req, res, ctx) => {
      return res(ctx.json(errorBody), ctx.status(401));
    }),
    ...handlers
  );
};

export const changeRequestResponseTo422 = ({ route, method, fields }) => {
  const message = randomString(30);
  const { errorBody, errors } = error_422({ message, fields });
  server.resetHandlers(
    rest[method](route, (req, res, ctx) => {
      return res(ctx.json(errorBody), ctx.status(422));
    }),
    ...handlers
  );
  return { message, errors };
};
