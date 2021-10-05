import { rest } from "msw";
import urlRoutes from "../constants/urlRoutes.constant";

const authenticationHandler = [
  rest.post(urlRoutes["login"], (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === "fkub@example.org" && password === "password") {
      return res(
        ctx.json({
          data: {
            user: {
              user_id: 1,
              name: "Ms. Mazie Doyle",
              email: "fkub@example.org",
            },
            token: "1|5oJJWKCFo2GbfLe4DIDIw0ynESMcKBh50wPbUuZG",
          },
        })
      );
    } else {
      return res(ctx.status(401));
    }
  }),
  rest.post(urlRoutes["register"], (req, res, ctx) => {
    const { email, password, password_confirmation } = req.body;
    if (
      email === "test@test.com" &&
      password === password_confirmation &&
      password === "1stStrongPassword"
    ) {
      return res(
        ctx.json({
          data: {
            user: {
              user_id: 51,
              name: "test",
              email: "test@test.com",
            },
            token: "35|Uf1yen4tOgDAldua7JZvtc67Y7ryogQj8Y297shJ",
          },
        })
      );
    } else if (
      email === "repeated@test.com" &&
      password === password_confirmation &&
      password === "1stStrongPassword"
    ) {
      return res(
        ctx.json({
          message: "The given data was invalid.",
          errors: {
            email: ["The email has already been taken."],
          },
        })
      );
    } else if (
      email === "test@test.com" &&
      password !== password_confirmation
    ) {
      return res(
        ctx.json({
          message: "The given data was invalid.",
          errors: {
            password: ["The password confirmation does not match."],
          },
        })
      );
    } else if (
      email === "repeated@test.com" &&
      password === password_confirmation &&
      password === "weak"
    ) {
      return res(
        ctx.json({
          message: "The given data was invalid.",
          errors: {
            email: ["The email has already been taken."],
            password: ["The password must be at least 8 characters."],
          },
        })
      );
    } else if (
      email === "test@test.com" &&
      password === password_confirmation &&
      password === "weak"
    ) {
      return res(
        ctx.json({
          message: "The given data was invalid.",
          errors: {
            password: ["The password must be at least 8 characters."],
          },
        })
      );
    } else {
      console.error("request is not expected");
      return res(ctx.status(404));
    }
  }),
];

export default authenticationHandler;
