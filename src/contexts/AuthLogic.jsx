import React, { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase_connect";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, pass, setError, setSuccess, setLoading) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => setSuccess("You successfully created a user"))
      .catch(({ code, message }) => {
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
      console.error(err);
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
