import { getAuth } from "@firebase/auth";
import { get, ref, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function useRequestAction({ requests, setRequests }) {
  const [user] = useAuthState(getAuth());
  const localRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();
  const handleClick = (uid, action) => {
    const updatedRequests = requests.filter((obj) => obj.uid !== uid);
    const otherUserRef = ref(db, `users/${uid}/data`);
    if (action === "deny") {
      get(localRef)
        .then((snap) => {
          if (snap.exists()) {
            const updatedData = {
              ...snap.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid[0] !== uid),
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request denied successfully", { variant: "success" });
                setRequests(updatedRequests);
              })
              .catch(() => {
                notify("Couldn't deny request", { variant: "error" });
              });
          }
        })
        .catch(() => {
          notify("Error when tried to get data", { variant: "error" });
        });
    } else {
      get(localRef)
        .then((snap) => {
          if (snap.exists()) {
            const updatedData = {
              ...snap?.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid[0] !== uid),
              friends: [...(snap.val().friends ?? []), uid],
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request acccepted successfully", {
                  variant: "success",
                });
                setRequests(updatedRequests);
              })
              .catch((err) => {
                console.log(err);
                notify("Couldn't accept request", { variant: "error" });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          notify("Error when tried to get data", { variant: "error" });
        });
      get(otherUserRef)
        .then((othersnap) => {
          if (othersnap.exists()) {
            const otherUpdatedData = {
              ...othersnap?.val(),
              friends: [...(othersnap.val().friends ?? []), user.uid],
            };
            update(otherUserRef, otherUpdatedData).catch(() => {
              notify("Couldn't update the requested user's data", {
                variant: "error",
              });
            });
          }
        })
        .catch(() =>
          notify("Error when tried to get other user's data", {
            variant: "error",
          })
        );
    }
  };
  return { handleClick };
}
