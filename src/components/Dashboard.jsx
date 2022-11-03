import NavBar from "./NavBar";
import background from "../assets/background.png";
export default function Dashboard() {
  return (
    <div
      style={{
        backgroundPosition: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        paddingBottom: 20,
      }}
    >
      <NavBar />
    </div>
  );
}
