import { rest } from "msw";
import apiRoutes from "../../constants/api-routes.constant";

const usersHandler = [
  rest.get(apiRoutes.users.getCurrentUser(), (req, res, ctx) => {
    return res(ctx.status(401));
  }),
];

export default usersHandler;
