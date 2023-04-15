import { getAuth } from "@firebase/auth";
import { get, ref, update } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

export default function useSaveMessage({ chatWith, setChatData }) {
  const [user] = useAuthState(getAuth());
  const userRef = ref(db, `users/${user?.uid}/data`);
  const [sendLoading, setSendLoading] = useState(false);
  const notify = useNotification();
  const saveMessage = (message, fileURL) => {
    setSendLoading(true);
    get(userRef)
      .then((snap) => {
        const userData = snap.val();
        const chat = userData?.chat || {};
        const messages = chat.messages || [];
        const currentDate = new Date();

        const day = currentDate.getUTCDate();
        const month = currentDate.getUTCMonth() + 1;
        const year = currentDate.getUTCFullYear();

        const hours = currentDate.getUTCHours();
        const minutes = currentDate.getUTCMinutes();
        const seconds = currentDate.getUTCSeconds();

        const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        const newMessage = {
          msgContent: message,
          time: dateString,
          oppositeUid: chatWith?.uid,
          file: fileURL,
        };
        const updatedData = {
          ...userData,
          chat: {
            ...chat,
            messages: [...messages, newMessage],
          },
        };

        update(userRef, updatedData).then(() => {
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
          newMessage.uid = user?.uid;
          newMessage.time = timeString + " UTC";
          setChatData((prev) => [...prev, newMessage]);
        });
      })
      .catch(() => {
        notify("Couldn't send the message", { variant: "error" });
      })
      .finally(() => {
        setSendLoading(false);
      });
  };

  return { saveMessage, sendLoading };
}
