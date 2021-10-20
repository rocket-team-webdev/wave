import React from "react";
import { motion } from "framer-motion";
import { fromRight } from "../../utils/motionSettings";

export default function GenreCard({
  isNegative = false,
  disabled = false,
  children,
  handleClick = () => {},
  ...props
}) {
  if (isNegative) {
    // Change to its color
  }

  return (
    <motion.button
      className="fx-rounded d-flex align-items-center fnt-caption genre-btn-positive px-2"
      type="button"
      disabled={disabled}
      onClick={handleClick}
      {...props}
      // Animation settings
      variants={fromRight}
    >
      {children}
    </motion.button>
  );
}
