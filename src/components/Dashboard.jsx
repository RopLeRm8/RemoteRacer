import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const auth = getAuth();
  return (
    <Button
      onClick={() => {
        localStorage.setItem("firstTime", "false");
        auth.signOut();
      }}
    >
      Sign out
    </Button>
  );
}
