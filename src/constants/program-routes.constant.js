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

  // Authentication
  login: () => `/login`,
  register: () => `/register`,
};

export default programRoutes;
