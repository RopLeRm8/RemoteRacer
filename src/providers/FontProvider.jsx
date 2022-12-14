import { useEffect } from "react";
import WebFont from "webfontloader";

export function useLoadFonts() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Slabo 27px",
          "Ubuntu",
          "Montserrat",
          "Noto Sans Hebrew",
          "IBM Plex Sans Hebrew",
          "Anton",
        ],
      },
    });
  }, []);
}
