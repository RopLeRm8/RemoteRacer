import { useEffect } from "react";
import WebFont from "webfontloader";

export function RefreshFonts() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Slabo 27px", "Ubuntu", "Montserrat"],
      },
    });
  }, []);
}
