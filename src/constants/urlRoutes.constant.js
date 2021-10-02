import urlConfig from "./urlConfig.constant";

const baseUrl = urlConfig.baseUrl;
const urlRoutes = {
  "exams.index": (page) => `${baseUrl}/exams?page=${page}`,
  "exams.show": (examId) => `${baseUrl}/exams/${examId}`,
  login: `${baseUrl}/authentication/login`,
};

export default urlRoutes;
