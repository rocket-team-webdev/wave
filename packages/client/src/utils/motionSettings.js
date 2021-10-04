const transitionTime = 0.1;

// -------
// Wrapper
// -------
export const containerAnimation = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    // opacity: 1,
    // scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: transitionTime,
    },
  },
};

// ---------------
// Main animations
// ---------------
export const fromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  transition: 2,
};

export const fromRight = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

// ----------
// Jumbo text
// ----------
// export const jumboAnimation =

// -----
// Heart
// -----
export const heartAnimationHover = {
  scale: 1.6,
};

export const heartAnimationTap = { scale: 0.8, rotate: 360 };
