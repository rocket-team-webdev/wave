import React from "react";
import { motion } from "framer-motion";
import { fromBottom } from "../../utils/motionSettings";

export default function JumboText({
  priText = "Welcome to WaveApp,",
  secText = false,
  isNegative = false,
  isAnimated,
  cols = "6",
}) {
  const classNames = `fnt-jumbo mt-0 pt-0 fnt-jumbo fnt-uppercase col col-12 col-md-${cols}`;
  return (
    <>
      {isAnimated ? (
        <motion.div
          className={classNames}
          variants={fromBottom}
          initial="hidden"
          animate="visible"
        >
          <p
            className={
              isNegative
                ? "fnt-light mb-0 text-break"
                : "fnt-primary mb-0 text-break"
            }
          >
            {priText}
          </p>
          {secText && (
            <p className="fnt-secondary mb-0 text-break">{secText}</p>
          )}
        </motion.div>
      ) : (
        <div className={classNames}>
          <p
            className={
              isNegative
                ? "fnt-light mb-0 text-break"
                : "fnt-primary mb-0 text-break"
            }
          >
            {priText}
          </p>
          {secText && (
            <p className="fnt-secondary mb-0 text-break">{secText}</p>
          )}
        </div>
      )}
    </>
  );
}
