import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function useGetRequestData() {
  const [user] = useAuthState(getAuth());
  const localUserRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();
  const [requests, setRequests] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const loadRequests = useCallback(() => {
    setDataLoading(true);
    get(localUserRef)
      .then(async (snap) => {
        try {
          const friendsRequests = snap?.val()?.friendsRequests;
          if (!friendsRequests) {
            notify("No friends request found", { variant: "error" });
            return;
          }
          const userRefs = friendsRequests.map((key) =>
            ref(db, `users/${key}/data`)
          );
          const userSnapshots = await Promise.all(
            userRefs.map((refer) =>
              get(refer).catch(() =>
                notify("Couldn't load some of the data", { variant: "error" })
              )
            )
          );
          setRequests(userSnapshots.map((snap) => snap.val()));
        } catch (err) {
          notify(
            "There was an error with data extract procedure, please report this issue",
            { variant: "error" }
          );
        }
      })
      .catch(() =>
        notify("There was an error connecting to the database", {
          variant: "error",
        })
      )
      .finally(() => {
        setDataLoading(false);
      });
  }, [notify]);
  return { loadRequests, dataLoading, requests };
}
