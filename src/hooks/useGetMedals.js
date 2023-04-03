import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../providers/FirebaseProvider";

const medalDesc = {
  firstSetup: "Has changed profile picture",
  place1: "Has earned first place",
  place2: "Has earned second place",
  place3: "Has earned third place",
  playFirstGame: "Has played first game",
  scoreMoreThan100: "Earned more than 100 points in 1 game",
};
export default function useGetMedals({ userSelected }) {
  const [medalsList, setMedalsList] = useState([]);

  useEffect(() => {
    if (userSelected) {
      const userSelectedRef = ref(
        db,
        `users/${userSelected?.uid}/achievements`
      );
      get(userSelectedRef).then((snap) => {
        const medals = snap?.val();
        const medalsArray = Object.entries(medals).map(([key, value]) => {
          return {
            id: key,
            earned: value,
            tooltip: medalDesc[key],
          };
        });
        setMedalsList(medalsArray);
      });
    }
  }, [userSelected]);

  return { medalsList };
}
