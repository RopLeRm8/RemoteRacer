import { useEffect } from "react";
import GameHistoryWindow from "../components/GameHistoryWindow";
import "../css/GameHistory.css";
import Navbar from "../layouts/NavBar";
export default function GameHistory() {
  useEffect(() => {
    document.body.classList.add("addbgGameHistory");
    return () => {
      document.body.classList.remove("addbgGameHistory");
    };
  }, []);
  return (
    <>
      <Navbar />
      <GameHistoryWindow />
    </>
  );
}
