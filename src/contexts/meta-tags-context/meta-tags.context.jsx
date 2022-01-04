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
          {metaData.title ? `${metaData.title} - ` : ""}Exams Galaxy
        </title>
        <meta name="description" content={metaData.description || ""} />
        <meta
          property="og:title"
          content={`${
            metaData.ogTitle ? `${metaData.ogTitle} - ` : ""
          }Exams Galaxy`}
        />
        <meta
          property="og:description"
          content={metaData.ogDescription || ""}
        />
        <meta
          property="og:image"
          content={metaData.ogImage || "https://examsgalaxy.com/auth-image.jpg"}
        />
      </Helmet>
      {children}
    </MetaTagsContext.Provider>
  );
};
