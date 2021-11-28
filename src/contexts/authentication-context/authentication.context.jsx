import {
  useState,
  useCallback,
  createContext,
  useEffect,
  useContext,
} from "react";
import { useMountedState } from "react-use";
import { Redirect } from "react-router-dom";
import { NotificationContext } from "../notification-context/notification.context";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  changePasswordRequest,
} from "../../services/authentication/authentication.service";
import { getCurrentUserRequest } from "../../services/users/users.service";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popover, setPopover] = useState("");
  const { createNotification } = useContext(NotificationContext);
  const isMounted = useMountedState();

  const authenticateUser = useCallback(
    (user, token, message = null) => {
      setUser(user);
      setToken(token);
      setErrors({});
      localStorage.setItem("token", token);
      if (message) {
        createNotification(message, 3000);
      }
    },
    [createNotification]
  );

  useEffect(() => {
    if (isAuthLoaded) {
      return;
    }
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      getCurrentUserRequest(savedToken)
        .then((response) => response.data.data)
        .then(({ user: receivedUser }) => {
          if (isMounted()) {
            authenticateUser(receivedUser, savedToken);
            setIsAuthLoaded(true);
          }
        })
        .catch(() => {
          if (isMounted()) {
            if (localStorage.getItem("token")) {
              localStorage.removeItem("token");
            }
            setIsAuthLoaded(true);
          }
        });
    } else {
      setIsAuthLoaded(true);
    }
  }, [isAuthLoaded, authenticateUser, isMounted]);

  useEffect(() => {
    if (user) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
      setToken(null);
    }
  }, [user]);

  const showUserLoginPopover = () => {
    setPopover("login");
  };

  const resetErrors = () => {
    if (errors) {
      setErrors({});
    }
  };

  const changePopover = (newPopover) => {
    if (
      newPopover !== "login" &&
      newPopover !== "register" &&
      newPopover !== ""
    ) {
      throw Error("popover is invalid");
    }
    setErrors({});
    setPopover(newPopover);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((response) => response.data.data)
      .then(({ user, token }) => {
        if (isMounted()) {
          authenticateUser(user, token, "you logged in successfully");
          setIsLoading(false);
        }
        return true;
      })
      .catch((err) => {
        if (isMounted()) {
          const { errors: receivedErrors, message } = err.response.data;
          setErrors((correntErrors) => ({
            ...correntErrors,
            ...receivedErrors,
            message,
          }));
          setIsLoading(false);
        }
        return false;
      });
  };

  const register = (name, email, password, password_confirmation) => {
    setIsLoading(true);
    registerRequest(name, email, password, password_confirmation)
      .then((response) => {
        return response.data.data;
      })
      .then(({ user, token }) => {
        if (isMounted()) {
          authenticateUser(user, token, "you registered successfully");
          setIsLoading(false);
        }
        return true;
      })
      .catch((requestErrors) => {
        if (isMounted()) {
          const err = requestErrors.response.data;
          const correntErrors = { ...errors };
          if (err.message) {
            correntErrors.message = err.message;
          }
          if (err.errors) {
            Object.keys(err.errors).forEach((error) => {
              correntErrors[error] = err.errors[error];
            });
          }
          setErrors(correntErrors);
          setIsLoading(false);
        }
        return false;
      });
  };

  const logout = () => {
    logoutRequest(token).then(() => {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        setUser(null);
      }
    });
  };

  const redirectIfNotAuthenticated = (component, location) => {
    if (isUserAuthenticated) {
      return component;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      );
    }
  };

  const changePassword = (
    currentPassword,
    newPassword,
    newPasswordConfirmation
  ) => {
    setIsLoading(true);
    changePasswordRequest(
      {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      },
      token
    )
      .then(() => {
        setUser(null);
        setIsLoading(false);
      })
      .catch((err) => {
        const newErrors = { ...err.response.data.errors };
        newErrors.message = err.response.data.message;
        setErrors(newErrors);
        setIsLoading(false);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        register,
        errors,
        isLoading,
        isAuthLoaded,
        popover,
        changePopover,
        resetErrors,
        token,
        isUserAuthenticated,
        showUserLoginPopover,
        redirectIfNotAuthenticated,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
