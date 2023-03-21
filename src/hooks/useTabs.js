import fifth from "../assets/GettingStarted/fifth.png";
import first from "../assets/GettingStarted/first.png";
import fourth from "../assets/GettingStarted/fourth.png";
import second from "../assets/GettingStarted/second.png";
import sixth from "../assets/GettingStarted/sixth.png";
import third from "../assets/GettingStarted/third.png";
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
      img: second,
      steps: [
        "Log in to your account",
        "Go to the 'Profile' page",
        "Click on the profile picture to update it",
        "Update account settings with pencil icon or 'update profile' button",
      ],
    },
    {
      title: "Customizing your car",
      content:
        "One of the most popular customization choices is changing the color of your car. Whether you want a bold and bright hue that turns heads, or a sleek and sophisticated shade that exudes elegance, we have a range of colors to choose from that are sure to fit your style.But it's not just about the color - you can also customize the name of your car to make it stand out even more. Whether you want to give your car a personalized name that reflects your personality, or simply want to make it easier to spot in a crowded parking lot, we can help.",
      img: third,
      steps: [
        "Log in to your account",
        "Go to the 'Customize' page",
        "Update the fields to your taste",
        "Click the 'save configuration' button to save changes",
      ],
    },
    {
      title: "Connecting the ESP to the Internet",
      content:
        "By connecting your ESP to the internet, you can make your devices more accessible, flexible, and powerful than ever before. Whether you're a hobbyist looking to experiment with new projects, or a business seeking to optimize your operations, an internet-connected ESP can help you achieve your goals. However, this is a complex task that requires careful planning, configuration, and security measures.. We made this very easy for out clients, so, here are the steps included:",
      img: fourth,
      steps: [
        "Log in to your account",
        "Open the profile menu",
        "Click on the 'ESP Settings' tab",
        "Scan for networks nearby",
        "Connect to a network and enjoy!",
      ],
    },
    {
      title: "Contacting Support",
      content:
        "If you are a client of a website and you encounter an issue or have a question that needs to be addressed, it's important to know how to contact the website's support team. Most websites have a dedicated support team that is available to assist users with any issues they may encounter.",
      img: fifth,
      steps: [
        "Log in to your account",
        "Open the SUPPORT tab",
        "Create a new ticket",
        "Click the SEND button",
        "We will contact you soon!",
      ],
    },
    {
      title: "Start playing the game",
      content:
        "If you're eager to start playing a new game, you may be wondering how to get started. Luckily, most games have a simple process for getting started, and it usually involves downloading the game, creating an account, and launching the game. On our website, no additional resource needs to be downloaded since the game is played directly on the WEB.",
      img: sixth,
      steps: [
        "Log in to your account",
        "Open the home page",
        "Click on 'PLAY'",
        "Make sure ESP is connected to WiFi",
        "Enjoy!",
      ],
    },
  ];
}
