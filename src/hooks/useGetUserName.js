import { getAuth } from "@firebase/auth";
import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

export default function useGetUserName() {
  const [dataLoading, setDataLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const query = ref(db);
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user?.uid}/data`;
  const notify = useNotification();

  useEffect(() => {
    setDataLoading(true);
    get(child(query, userRefDB))
      .then((snapshot) => {
        setUserName(snapshot.val()?.name ?? null);
      })
      .catch(() => {
        notify("Couldn't connect to database", { variant: "error" });
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [query, userRefDB, notify]);

  return { userName, dataLoading };
}
