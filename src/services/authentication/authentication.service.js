import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const registerRequest = async (
  name,
  email,
  password,
  password_confirmation
) => {
  return axios.post(
    urlRoutes["register"],
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
    urlRoutes["login"],
    { email, password },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
};
