import apiRoutes from "../../constants/api-routes.constant";
import axios from "axios";

export const getCurrentUserRequest = (token) => {
  return axios.get(apiRoutes.users.getCurrentUser(), {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
