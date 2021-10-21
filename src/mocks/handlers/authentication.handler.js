import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";
import {
  userMock,
  userEmail,
  repeatedEmail,
  correctPassword,
  shortPassword,
} from "../mocks/authentication.mock";
import { invalidCriteriaError } from "../errors/failed-login.error";
import {
  shortPasswordError,
  shortPasswordAndRepeatedEmailError,
  repeatedEmailError,
  passwordMatchError,
} from "../errors/failed-register.error";

const authenticationHandler = [
  rest.post(apiRoutes.authentication.login(), (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === userEmail && password === correctPassword) {
      return res(ctx.json(userMock));
    } else {
      return res(ctx.status(401), ctx.json(invalidCriteriaError));
    }
  }),
  rest.post(apiRoutes.authentication.register(), (req, res, ctx) => {
    const { email, password, password_confirmation } = req.body;
    if (
      email === userEmail &&
      password === password_confirmation &&
      password === correctPassword
    ) {
      return res(ctx.status(201), ctx.json(userMock));
    } else if (
      email === repeatedEmail &&
      password === password_confirmation &&
      password === correctPassword
    ) {
      return res(ctx.status(422), ctx.json(repeatedEmailError));
    } else if (email === userEmail && password !== password_confirmation) {
      return res(ctx.status(422), ctx.json(passwordMatchError));
    } else if (
      email === repeatedEmail &&
      password === password_confirmation &&
      password === shortPassword
    ) {
      return res(ctx.status(422), ctx.json(shortPasswordAndRepeatedEmailError));
    } else if (
      email === userEmail &&
      password === password_confirmation &&
      password === shortPassword
    ) {
      return res(ctx.status(422), ctx.json(shortPasswordError));
    } else {
      console.error(
        `request is not expected(email: '${email}', password: '${password}')`
      );
      return res(ctx.status(404));
    }
  }),
];

export default authenticationHandler;
