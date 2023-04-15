import { getAuth } from "@firebase/auth";
import { get, off, onChildAdded, ref } from "firebase/database";
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
  const otherUserRefChat = ref(db, `users/${chatWith?.uid}/data/chat/messages`);
  const notify = useNotification();
  useEffect(() => {
    if (!openChat) return;
    setIsLoading(true);
    const chatListener = onChildAdded(otherUserRefChat, (snapshot) => {
      const newMessage = snapshot.val();
      const msgTime = newMessage.time;
      const [day, month, year, hours, minutes, seconds] =
        msgTime.split(/[/: ]/);
      const date = new Date(
        Date.UTC(year, month - 1, day, hours, minutes, seconds),
      );
      const options = {
        year: "numeric",
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC",
      };
      const timeString = date.toLocaleString("en-US", options);
      newMessage.uid = chatWith?.uid;
      newMessage.time = timeString + " UTC";
      setChatData((prevChatData) => [...prevChatData, newMessage]);
    });
    Promise.allSettled([
      get(localUserRef).then((snap) => snap.val()?.chat.messages ?? []),
      get(otherUserref).then((snap) => snap.val()?.chat.messages ?? []),
    ])
      .then(([localChat, otherChat]) => {
        // if (localChat.status === "rejected" && !localChat.value) {
        //   notify("Couldn't get local user's data, contact administrator", {
        //     variant: "error",
        //   });
        //   setChatData([]);
        //   return;
        // }
        // if (otherChat.status === "rejected") {
        //   notify("Couldn't get other user's data, contact administrator", {
        //     variant: "error",
        //   });
        //   setChatData([]);
        //   return;
        // }
        const combinedChat = [];
        for (const key in localChat.value) {
          const msgTime = localChat.value[key].time;
          const [day, month, year, hours, minutes, seconds] =
            msgTime.split(/[/: ]/);
          const date = new Date(
            Date.UTC(year, month - 1, day, hours, minutes, seconds),
          );
          const options = {
            year: "numeric",
            day: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "UTC",
          };
          const timeString = date.toLocaleString("en-US", options);
          combinedChat.push({
            uid: user?.uid,
            file: localChat.value[key].file,
            oppositeUid: localChat.value[key].oppositeUid,
            msgContent: localChat.value[key].msgContent,
            time: timeString + " UTC",
            reactions: localChat.value[key].reactions,
          });
        }
        for (const key in otherChat.value) {
          const msgTime = otherChat.value[key].time;
          const [day, month, year, hours, minutes, seconds] =
            msgTime.split(/[/: ]/);
          const date = new Date(
            Date.UTC(year, month - 1, day, hours, minutes, seconds),
          );
          const options = {
            year: "numeric",
            day: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "UTC",
          };
          const timeString = date.toLocaleString("en-US", options);
          combinedChat.push({
            uid: chatWith?.uid,
            file: otherChat.value[key].file,
            oppositeUid: otherChat.value[key].oppositeUid,
            msgContent: otherChat.value[key].msgContent,
            time: timeString + " UTC",
            reactions: otherChat.value[key].reactions,
          });
        }
        const sortedChat = combinedChat
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .reverse();
        console.log(combinedChat);
        setChatData(sortedChat);
      })
      .catch(() => {
        notify("Couldn't connect to firebase", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      off(otherUserRefChat, chatListener);
    };
  }, [chatWith, notify, openChat]);

  return { chatData, isLoading, setChatData };
}
