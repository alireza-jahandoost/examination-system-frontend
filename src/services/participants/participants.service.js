import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const registerToExamRequest = (examId, password = "") => {
  const bodyObject = {};
  if (password) {
    bodyObject.password = password;
  }
  return axios.post(urlRoutes["participants.register"](examId), bodyObject, {
    headers: {
      accept: "application/json",
    },
  });
};
