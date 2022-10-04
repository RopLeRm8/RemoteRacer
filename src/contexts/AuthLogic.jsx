import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
import { auth } from "../firebase_connect";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const alertRef = useRef();

  function signUp(email, pass, setError, setSuccess, setLoading) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        setSuccess("You successfully created a user");
        auth.signOut();
      })
      .catch(({ code }) => {
        switch (code) {
          case "auth/email-already-in-use":
            setSuccess("");
            setError("Email is already in use");
            break;
          default:
            setSuccess("");
            setError("Unknown error");
        }
      })
      .finally(() => setLoading(false));
  }

  function login(email, password) {
    try {
      return auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    const unsubber = auth.onAuthStateChanged((user) => {
      if (!user) return;

      setCurrentUser(user);
    });
    return unsubber;
  }, []);
  useEffect(() => {
    if (!alertRef.current) return;

    setTimeout(() => {
      alertRef.current?.classList.remove("alertin");
      alertRef.current.classList.add("alertout");

      setTimeout(() => {
        const elm = alertRef.current;
        elm?.parentNode.removeChild(elm);
      }, 700);
    }, 5000);
  }, [alertRef]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
