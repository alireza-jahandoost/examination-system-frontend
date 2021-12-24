import { createContext, useState, useEffect, useContext } from "react";
import useAsyncError from "../../hooks/useAsyncError";
import { useMountedState } from "react-use";
import { AuthenticationContext } from "../authentication-context/authentication.context";
import { showUserRequest } from "../../services/users/users.service";

export const UserContext = createContext();

export const UserProvider = ({ children, userId }) => {
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const isMounted = useMountedState();
  const throwError = useAsyncError();

  useEffect(() => {
    if (!token || isLoading || (user && user.user_id === userId) || isFailed) {
      return;
    }

    setIsLoading(true);
    showUserRequest(userId, token)
      .then((response) => response.data.data)
      .then(({ user }) => {
        if (isMounted()) {
          setUser(user);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (isMounted()) {
          switch (Number(e?.response?.status)) {
            case 401:
              removeUserInfo();
              break;
            default:
              throwError(e);
          }
          setIsFailed(true);
          setIsLoading(false);
        }
      });
  }, [
    userId,
    isLoading,
    removeUserInfo,
    token,
    user,
    isMounted,
    isFailed,
    throwError,
  ]);

  const value = { user, isLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
