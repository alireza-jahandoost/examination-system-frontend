import { createContext, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";

export const MetaTagsContext = createContext();

export const MetaTagsProvider = ({ children }) => {
  const [metaData, setMetaData] = useState({});

  const value = {
    changeMetaData: useCallback((newMetaData) => setMetaData(newMetaData), []),
    metaData,
  };

  return (
    <MetaTagsContext.Provider value={value}>
      <Helmet>
        <title>
          {metaData.title ? `${metaData.title} - ` : "Exams Galaxy"}Exams Galaxy
        </title>
        <meta
          name="description"
          content={
            metaData.description ||
            `-Variety in question design
            -A safe environment to test and to be tested
            -ExamsGalaxy changes your view of the examination`
          }
        />
        <meta
          property="og:title"
          content={`${
            metaData.ogTitle
              ? `${metaData.ogTitle} - `
              : "Design & Take the exam in the best way possible"
          }Exams Galaxy`}
        />
        <meta
          property="og:description"
          content={
            metaData.ogDescription ||
            `-Variety in question design
            -A safe environment to test and to be tested
            -ExamsGalaxy changes your view of the examination`
          }
        />
        <meta
          property="og:image"
          content={
            metaData.ogImage || "https://app.examsgalaxy.com/auth-image.jpg"
          }
        />
      </Helmet>
      {children}
    </MetaTagsContext.Provider>
  );
};
