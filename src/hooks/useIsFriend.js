// import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
// import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

export default function useIsFriend({ userSelected }) {
  const notify = useNotification();
  const [user] = useAuthState(getAuth());
  const userRef = ref(db, `users/${user?.uid}/data/friends`);
  const [isFriend, setIsFriend] = useState(false);
  const checkIfFriend = () => {
    get(userRef)
      .then((snap) => {
        if (snap.exists()) {
          if (snap.val().find((friend) => friend === userSelected?.uid)) {
            setIsFriend(true);
          } else {
            setIsFriend(false);
          }
        }
      })
      .catch(() =>
        notify("Couldn't verify if user is friend", { variant: "error" })
      );
  };
  return { checkIfFriend, isFriend };
}
