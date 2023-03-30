import { getAuth } from "@firebase/auth";
import { get, ref, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";
export default function useRemoveFriend({ friends, setFriends }) {
  const [user] = useAuthState(getAuth());
  const localRef = ref(db, `users/${user.uid}/data`);
  const notify = useNotification();
  const handleRemove = (uid) => {
    const otherRef = ref(db, `users/${uid}/data`);
    const updatedFriends = friends.filter((obj) => obj.uid !== uid);
    get(localRef)
      .then((snap) => {
        if (snap.exists()) {
          const friends = snap?.val()?.friends;
          const updatedData = {
            ...snap?.val(),
            friends: friends.filter((friend) => friend !== uid),
          };
          update(localRef, updatedData)
            .then(() => {
              notify("Friend removed successfully", { variant: "success" });
              setFriends(updatedFriends);
            })
            .catch(() => {
              notify("Couldn't remove the friend", { variant: "error" });
            });
        }
      })
      .catch(() => {
        notify("Couldn't connect to database", { variant: "error" });
      });
    get(otherRef)
      .then((snap) => {
        if (snap.exists()) {
          const friends = snap?.val()?.friends;
          const updatedData = {
            ...snap?.val(),
            friends: friends.filter((friend) => friend !== user.uid),
          };
          console.log(updatedData);
          update(otherRef, updatedData).catch(() =>
            notify("There was an error updating the requested user's data", {
              variant: "error",
            })
          );
        }
      })
      .catch(() => {
        notify("Couldn't connect to database", { variant: "error" });
      });
  };
  return { handleRemove };
}
