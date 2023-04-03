import { getAuth } from "@firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";
export default function useLoadChat({ chatWith, openChat }) {
  const [user] = useAuthState(getAuth());
  const localUserRef = ref(db, `users/${user?.uid}/data`);
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const otherUserref = ref(db, `users/${chatWith?.uid}/data`);
  const notify = useNotification();
  useEffect(() => {
    if (!openChat) return;
    setIsLoading(true);
    Promise.allSettled([
      get(localUserRef).then((snap) => snap.val()?.chat.messages ?? []),
      get(otherUserref).then((snap) => snap.val()?.chat.messages ?? []),
    ])
      .then(([localChat, otherChat]) => {
        if (localChat.status === "rejected") {
          notify("Couldn't get local user's data, contact administrator", {
            variant: "error",
          });
          setChatData([]);
          return;
        }
        if (otherChat.status === "rejected") {
          notify("Couldn't get other user's data, contact administrator", {
            variant: "error",
          });
          setChatData([]);
          return;
        }
        const combinedChat = [];
        for (const key in localChat.value) {
          combinedChat.push({
            uid: user?.uid,
            msgContent: localChat.value[key].msgContent,
            time: localChat.value[key].time,
            reactions: localChat.value[key].reactions,
          });
        }
        for (const key in otherChat.value) {
          combinedChat.push({
            uid: chatWith?.uid,
            msgContent: otherChat.value[key].msgContent,
            time: otherChat.value[key].time,
            reactions: otherChat.value[key].reactions,
          });
        }
        const sortedChat = combinedChat
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .reverse();
        setChatData(sortedChat);
      })
      .catch(() => {
        notify("Couldn't connect to firebase", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chatWith, notify, openChat]);

  return { chatData, isLoading, setChatData };
}
