import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
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
            return;
          }
          const userRefs = friendsRequests.map((key) =>
            ref(db, `users/${key[0]}/data`)
          );
          const userSnapshots = await Promise.all(
            userRefs.map((refer) =>
              get(refer).catch(() =>
                notify("Couldn't load some of the data", { variant: "error" })
              )
            )
          );
          setRequests(
            userSnapshots.map((snap, ind) => ({
              ...snap.val(),
              uid: friendsRequests[ind][0],
              date: friendsRequests[ind][1],
            }))
          );
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

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return { loadRequests, dataLoading, requests, setRequests };
}
