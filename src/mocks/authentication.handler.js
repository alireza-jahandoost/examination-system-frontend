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
];

export default authenticationHandler;
