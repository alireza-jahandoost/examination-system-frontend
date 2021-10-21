import apiRoutes from "../../constants/api-routes.constant";
import axios from "axios";

export const registerRequest = async (
  name,
  email,
  password,
  password_confirmation
) => {
  return axios.post(
    apiRoutes.authentication.register(),
    { name, email, password, password_confirmation },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
};

export const loginRequest = async (email, password) => {
  return axios.post(
    apiRoutes.authentication.login(),
    { email, password },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
};
