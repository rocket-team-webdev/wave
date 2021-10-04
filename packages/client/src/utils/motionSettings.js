export const containerAnimation = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    // opacity: 1,
    // scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const trackAnimation = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const heartAnimationHover = {
  scale: 1.6,
  //   color: "white",
};

export const heartAnimationTap = { scale: 0.8, rotate: 360 };
