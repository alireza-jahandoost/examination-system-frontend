import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useMountedState } from "react-use";

import useAsyncError from "../../hooks/useAsyncError";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

import { participatedExamsIndexRequest } from "../../services/exams/exams.service";

export const ParticipatedExamsContext = createContext();

export const ParticipatedExamsProvider = ({ children }) => {
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const location = useLocation();
  const page = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 1;
  }, [location]);
  const isMounted = useMountedState();
  const throwError = useAsyncError();

  useEffect(() => {
    if (Number(page) === Number(currentPage) || isLoading) {
      return;
    }
    setIsLoading(true);
    participatedExamsIndexRequest(token, page)
      .then((response) => response.data)
      .then(({ data, meta }) => {
        if (isMounted()) {
          setCurrentPage(Number(meta.current_page));
          setNumberOfPages(Number(meta.last_page));
        }
        return data;
      })
      .then(({ exams }) => {
        if (isMounted()) {
          setExams([...exams]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        switch (Number(err?.response?.status)) {
          case 401:
            removeUserInfo();
            break;
          default:
            throwError(err);
        }
      });
  }, [
    page,
    token,
    isMounted,
    currentPage,
    isLoading,
    removeUserInfo,
    throwError,
  ]);

  const value = { exams, isLoading, page, currentPage, numberOfPages };

  return (
    <ParticipatedExamsContext.Provider value={value}>
      {children}
    </ParticipatedExamsContext.Provider>
  );
};
