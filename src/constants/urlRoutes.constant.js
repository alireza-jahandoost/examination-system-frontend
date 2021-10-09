import urlConfig from "./urlConfig.constant";

const baseUrl = urlConfig.baseUrl;
const urlRoutes = {
  "exams.index": `${baseUrl}/exams`,
  "exams.show": (examId) => `${baseUrl}/exams/${examId}`,

  login: `${baseUrl}/authentication/login`,
  register: `${baseUrl}/authentication/register`,

  "participants.register": (examId) => `${baseUrl}/exams/${examId}/register`,
};

export default urlRoutes;
