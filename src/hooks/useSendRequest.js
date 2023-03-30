import { getAuth } from "@firebase/auth";
import { get, ref, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function useSendRequest({ setRequestSend, userSelected }) {
  const [user] = useAuthState(getAuth());
  const localUserRef = ref(db, `users/${user?.uid}/data`);
  const usersRefData = ref(db, `users/${userSelected?.uid}/data`);

  const notify = useNotification();
  const addFriend = () => {
    setRequestSend(true);
    get(usersRefData)
      .then((snap) => {
        const friendsRequests = snap?.val()?.friendsRequests;
        const friends = snap?.val()?.friends;
        const isRequested =
          Array.isArray(friendsRequests) &&
          friendsRequests.length > 0 &&
          friendsRequests.find((friendReq) => friendReq[0] === user.uid);

        const isFriend =
          Array.isArray(friends) &&
          friends.length > 0 &&
          friends.find((friend) => friend === user.uid);

        get(localUserRef).then((snap) => {
          if (snap.exists()) {
            const friendsRequestsOther = snap?.val()?.friendsRequests;
            const isRequestedOther =
              Array.isArray(friendsRequestsOther) &&
              friendsRequestsOther.length > 0 &&
              friendsRequestsOther.find(
                (friendReq) => friendReq[0] === userSelected.uid
              );
            if (!isRequested && !isFriend && !isRequestedOther) {
              const currentDate = new Date();

              const day = currentDate.getDate();
              const month = currentDate.getMonth() + 1;
              const year = currentDate.getFullYear();

              const hours = currentDate.getHours();
              const minutes = currentDate.getMinutes();
              const seconds = currentDate.getSeconds();

              const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
              update(
                usersRefData,
                {
                  friendsRequests: [
                    ...(friendsRequests || []),
                    [user.uid, dateString],
                  ],
                },
                {
                  set: true,
                }
              )
                .then(() => {
                  notify("Friend request sent!", { variant: "success" });
                })
                .catch(() => {
                  notify("Couldn't send friend request", {
                    variant: "error",
                  });
                });
            } else {
              notify(
                "Friend request already sent or the user is already a friend",
                { variant: "info" }
              );
            }
          }
        });
      })
      .catch(() => {
        notify("Couldn't send friend request", {
          variant: "error",
        });
      })
      .finally(() => {
        setRequestSend(false);
      });
  };
  return { addFriend };
}
