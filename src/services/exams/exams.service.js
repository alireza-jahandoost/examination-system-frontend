import apiRoutes from "../../constants/api-routes.constant";
import axios from "axios";

export const examsIndexRequest = async (page) => {
  return axios(apiRoutes.exams.indexAllExams(), {
    params: {
      page: page,
    },
    headers: {
      accept: "application/json",
    },
  });
};

export const examsShowRequest = async (examId, token = "") => {
  const hdrs = {
    accept: "application/json",
  };
  if (token) {
    hdrs.authorization = `Bearer ${token}`;
  }
  return axios.get(apiRoutes.exams.showExam(examId), {
    headers: hdrs,
  });
};
