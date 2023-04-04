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

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

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
          newMessage.uid = user?.uid;
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
