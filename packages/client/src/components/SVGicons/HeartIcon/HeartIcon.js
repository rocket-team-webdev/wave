import React from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  heartAnimationTap,
  heartAnimationHover,
} from "../../../utils/motionSettings";

export default function HeartIcon({ isFull }) {
  return (
    <motion.div
      className="heart-icon"
      whileHover={heartAnimationHover}
      whileTap={heartAnimationTap}
    >
      {isFull ? <FaHeart /> : <FaRegHeart />}
    </motion.div>
  );
}
