import React from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  heartAnimationTap,
  heartAnimationHover,
} from "../../../utils/motionSettings";

export default function HeartIcon({ classNames, isFull }) {
  const iconClassNames = `${classNames} heart-icon`;
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
