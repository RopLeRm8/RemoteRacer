import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
import { auth, db } from "../providers/FirebaseProvider";
import { ref, child, get, set } from "firebase/database";

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
      const userRef = ref(db, `users/${user.uid}`);
      const query = ref(db);
      const userRefDB = `users/${user.uid}`;

      get(child(query, userRefDB)).then((snapshot) => {
        if (snapshot.exists && snapshot.val()) return;
        set(userRef, {
          achievements: {
            place1: false,
            place2: false,
            place3: false,
            firstSetup: false,
            playFirstGame: false,
            scoreMoreThan100: false,
          },
          data: {
            name: user.displayName,
            mail: user.email,
            photoURL: user.photoURL,
          },
        });
      });
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
