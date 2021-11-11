const programRoutes = {
  // Profile
  profile: () => `/profile`,
  settings: () => `/profile/settings`,

  // Pages
  aboutUs: () => `/about-us`,
  contactUs: () => `/contact-us`,

  // Exams
  examsRoot: () => `/exams`,
  indexAllExams: () => `/exams`,
  indexParticipatedExams: () => `/exams/participated-exams`,
  indexCreatedExams: () => `/exams/created-exams`,
  createExam: () => `/exams/create-new-exam`,
  updateExam: (examId) => `/exams/${examId}/edit`,
  examining: (examId) => `/exams/${examId}`,
  examiningOverview: (examId) => `/exams/${examId}/overview`,
  examiningQuestion: (examId, questionId) =>
    `/exams/${examId}/question/${questionId}`,

  // Authentication
  login: () => `/login`,
  register: () => `/register`,
};

export default programRoutes;
