import React from "react";

export default function JumboText({
  priText = "Welcome to WaveApp,",
  secText = false,
  isNegative = false,
  cols = "6",
}) {
  return (
    <div
      className={`fnt-jumbo mt-0 pt-0 fnt-jumbo fnt-uppercase col col-12 col-md-${cols}`}
    >
      <p className={isNegative ? "fnt-light mb-0" : "fnt-primary mb-0"}>
        {priText}
      </p>
      {secText && <p className="fnt-secondary mb-0">{secText}</p>}
    </div>
  );
}
