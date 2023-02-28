import first from "../assets/GettingStarted/first.jpg";

export default function useTabs() {
  return [
    {
      title: "First steps",
      content:
        "Welcome to our website where we showcase an exciting project involving a physical toy car and a keyboard.By simply visiting our website, you can experience the thrill of remotely controlling a toy car using your keyboard. This project is not only fun but also serves as an educational tool for anyone interested in the field of robotics, coding, and automation.To fully appreciate the ingenuity behind our project, we encourage you to explore our website and see firsthand how this game works. Only then can you truly appreciate the level of technical expertise and creativity that went into its development.",
      img: first,
    },
    {
      title: "Setting up profile",
      content:
        "Configuring your profile is an important step in getting the most out of our platform. Here are the steps you can follow to configure your profile.",
      img: first,
      steps: [
        "Log in to your account",
        "Go to the 'Profile' page",
        "Click on the profile picture to change it",
        "Click on 'pencil' icon or 'update profile' button to change the basic account settings",
      ],
    },
  ];
}
