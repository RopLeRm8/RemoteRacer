import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ScrollAnimation({ children, animationName, duration }) {
  return (
    <AnimationOnScroll
      animateIn={animationName}
      duration={duration ? duration : 0.5}
      animateOnce
    >
      {children}
    </AnimationOnScroll>
  );
}
