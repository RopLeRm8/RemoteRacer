import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

export default function useLoadPointsGames() {
  const [user] = useAuthState(getAuth());
  const [dataLoading, setDataLoading] = useState(true);
  const [gamesVal, setGamesVal] = useState(0);
  const [pointsVal, setPointsVal] = useState(0);
  const userRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();

  useEffect(() => {
    setDataLoading(true);

    get(userRef)
      .then((snap) => {
        if (!snap.exists()) {
          setPointsVal(0);
          setGamesVal(0);
          notify("Points and games data not found for user.", {
            variant: "error",
          });
        } else {
          setPointsVal(snap.val().points ?? 0);
          setGamesVal(snap.val().games ?? 0);
        }
      })
      .catch(() => {
        notify("Failed to load points and games data.", { variant: "error" });
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [notify]);

  return { dataLoading, pointsVal, gamesVal };
}
