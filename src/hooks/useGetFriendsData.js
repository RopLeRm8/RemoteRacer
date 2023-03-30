import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

export default function useGetFriendsData() {
  const [user] = useAuthState(getAuth());
  const localUserRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();
  const [friends, setFriends] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const loadFriends = useCallback(() => {
    setDataLoading(true);
    get(localUserRef)
      .then(async (snap) => {
        try {
          const friends = snap?.val()?.friends;
          if (!friends) {
            return;
          }
          const userRefs = friends.map((key) => ref(db, `users/${key}/data`));
          const userSnapshots = await Promise.all(
            userRefs.map((refer) =>
              get(refer).catch(() =>
                notify("Couldn't load some of the data", { variant: "error" })
              )
            )
          );
          setFriends(
            userSnapshots.map((snap, ind) => ({
              ...snap.val(),
              uid: friends[ind],
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
    loadFriends();
  }, [loadFriends]);

  return { loadFriends, dataLoading, friends, setFriends };
}
