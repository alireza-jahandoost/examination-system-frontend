import { useState, useCallback } from "react";
import { useMountedState } from "react-use";

const useAsyncError = () => {
  const [_, setError] = useState();
  const isMounted = useMountedState();
  return useCallback(
    (e) => {
      if (isMounted()) {
        setError(() => {
          throw e;
        });
      }
    },
    [isMounted]
  );
};

export default useAsyncError;
