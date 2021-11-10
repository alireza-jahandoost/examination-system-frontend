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

export const finishExamRequest = (examId, token) => {
  return axios.put(
    apiRoutes.participants.finishExam(examId),
    {},
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
};
