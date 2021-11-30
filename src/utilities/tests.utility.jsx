import { Context as ResponsiveContext } from "react-responsive";
import { act } from "@testing-library/react";
import { rest } from "msw";

import { server, handlers } from "../mocks/server";
import apiRoutes from "../constants/api-routes.constant";
import "../mocks/server";
import { error_401, error_422 } from "../mocks/errors/pure-error-bodies.error";
import {
  examShowId_1,
  examShowId_2,
  examShowId_3,
  examShowId_4,
  examShowId_5_withPassword,
} from "../mocks/mocks/exams.mock";

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

  const handler = rest.get(
    apiRoutes.exams.showExam(examId),
    (req, res, ctx) => {
      let exam;
      switch (Number(examId)) {
        case 1:
          exam = examShowId_1.data.exam;
          break;
        case 2:
          exam = examShowId_2.data.exam;
          break;
        case 3:
          exam = examShowId_3.data.exam;
          break;
        case 4:
          exam = examShowId_4.data.exam;
          break;
        case 5:
          exam = examShowId_5_withPassword.data.exam;
          break;
        default:
          throw new Error("Unexpected examId in asignExamShowStartAndEnd");
      }
      const add = {};
      if (hasPassword === true) add.has_password = hasPassword;
      return res(
        ctx.json({
          data: {
            exam: {
              ...exam,
              start_of_exam: formatted_start_date,
              end_of_exam: formatted_end_date,
              ...add,
            },
          },
        })
      );
    }
  );
  server.resetHandlers(handler, ...handlers);

  return handler;
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

export const changeRequestResponseTo401 = ({
  route,
  method,
  otherHandlers = [],
}) => {
  const { errorBody } = error_401();
  server.resetHandlers(
    rest[method](route, (req, res, ctx) => {
      return res(ctx.json(errorBody), ctx.status(401));
    }),
    ...otherHandlers,
    ...handlers
  );
};

export const changeRequestResponseTo422 = ({
  route,
  method,
  fields,
  otherHandlers = [],
}) => {
  const message = randomString(30);
  const { errorBody, errors } = error_422({ message, fields });
  server.resetHandlers(
    rest[method](route, (req, res, ctx) => {
      return res(ctx.json(errorBody), ctx.status(422));
    }),
    ...otherHandlers,
    ...handlers
  );
  return { message, errors };
};
