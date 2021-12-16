import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const useCurrentPath = () => {
  const location = useLocation();

  return useCallback(
    (expected) => {
      return location.pathname === expected;
    },
    [location]
  );
};

export default useCurrentPath;
