import apiRoutes from "../../constants/api-routes.constant";
import axios from "axios";

export const registerToExamRequest = (examId, token, password = "") => {
  const bodyObject = {};
  if (password) {
    bodyObject.password = password;
  }
  return axios.post(apiRoutes.exams.registerInExam(examId), bodyObject, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
