import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../providers/FirebaseProvider";
import { useNotification } from "./useNotification";

const usersRef = ref(db, "users/");

export default function useGetOptions() {
  const notify = useNotification();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get(usersRef)
      .then((snapshot) => {
        const data = snapshot.val();
        setUsersData([]);
        for (const key in data) {
          const user = data[key].data;
          user.uid = key;
          setUsersData((prev) => [...prev, user]);
        }
      })
      .catch(() => {
        notify("An error happened loading users", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [notify]);

  return { usersData, loading };
}
