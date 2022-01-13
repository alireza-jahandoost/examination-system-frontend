const prefix = "https://examsgalaxy.com";
const externalRoutes = {
  help: () => `${prefix}/help`,
  contactUs: () => `${prefix}/contact-us`,
  main: () => `${prefix}`,
  socialMedia: {
    telegram: () => "https://www.telegram.com",
    linkedin: () => "https://www.linkedin.com",
    instagram: () => "https://www.instagram.com",
    twitter: () => "https: //www.twitter.com",
  },
};

export default externalRoutes;
