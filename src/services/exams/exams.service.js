import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const examsIndexRequest = async (page) => {
  return axios(urlRoutes["exams.index"], {
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
  return axios.get(urlRoutes["exams.show"](examId), {
    headers: hdrs,
  });
};