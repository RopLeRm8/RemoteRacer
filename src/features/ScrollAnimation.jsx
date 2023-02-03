import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ScrollAnimation({ children, animationName }) {
  return (
    <AnimationOnScroll animateIn={animationName} duration={0.5} animateOnce>
      {children}
    </AnimationOnScroll>
  );
}
