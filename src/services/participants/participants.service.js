import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const registerToExamRequest = (examId, token, password = "") => {
  const bodyObject = {};
  if (password) {
    bodyObject.password = password;
  }
  return axios.post(urlRoutes["participants.register"](examId), bodyObject, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
