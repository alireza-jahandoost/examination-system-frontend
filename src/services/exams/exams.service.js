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

export const ownedExamsIndexRequest = async (token, page = 1) => {
  return axios(apiRoutes.exams.indexCreatedExams(), {
    params: {
      page: page,
    },
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
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

export const examsStoreRequest = (token, body) => {
  return axios.post(apiRoutes.exams.createExam(), body, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const examsUpdateRequest = (token, body, examId) => {
  return axios.put(apiRoutes.exams.updateExam(examId), body, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
