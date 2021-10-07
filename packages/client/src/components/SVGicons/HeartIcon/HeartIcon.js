import React from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  heartAnimationTap,
  heartAnimationHover,
} from "../../../utils/motionSettings";

import "./HeartIcon.scss";

export default function HeartIcon({
  classNames,
  isFull,
  isLarge,
  isNegative = false,
}) {
  let iconClassNames = `${classNames} `;

  if (isNegative) {
    iconClassNames += " heart-icon-negative";
  } else {
    iconClassNames += " heart-icon-positive";
  }

  if (isLarge) {
    iconClassNames += " large-heart-icon";
  }
  return (
    <motion.div
      className={iconClassNames}
      whileHover={heartAnimationHover}
      whileTap={heartAnimationTap}
    >
      {isFull ? <FaHeart /> : <FaRegHeart />}
    </motion.div>
  );
}
