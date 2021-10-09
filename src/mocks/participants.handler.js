import { rest } from "msw";
import urlRoutes from "../constants/urlRoutes.constant";

const participantsHandler = [
  rest.post(urlRoutes["participants.register"](1), (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        message: "Unauthenticated.",
      })
    );
  }),
  rest.post(urlRoutes["participants.register"](2), (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.post(urlRoutes["participants.register"](4), (req, res, ctx) => {
    const { password } = req.body;
    if (password === "password") {
      return res(ctx.status(201));
    } else {
      return res(ctx.status(403));
    }
  }),
];

export default participantsHandler;
