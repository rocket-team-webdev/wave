import React from "react";

function JumboText({
  priText = "Welcome to WaveApp.",
  secText = false,
  isNegative = false,
}) {
  return (
    <div className="fnt-jumbo mt-0 pt-0 fnt-jumbo fnt-uppercase">
      <p className={isNegative ? "fnt-light mb-0" : "fnt-primary mb-0"}>
        {priText}
      </p>
      {secText && <p className="fnt-secondary mb-0">{secText}</p>}
    </div>
  );
}

export default JumboText;
