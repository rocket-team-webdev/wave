import React from "react";

import "./RadioButtons.scss";

export default function RadioButtons({ handleChange = () => {} }) {
  return (
    <div
      className="btn-group home-radio"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="custom-btn-check"
        name="btnradio"
        id="popularRadio"
        autoComplete="off"
        onChange={handleChange}
        defaultChecked
      />
      <label
        className="fnt-caption custom-radio p-2"
        htmlFor="popularRadio"
        checked
      >
        Popular
      </label>

      <input
        type="radio"
        className="custom-btn-check"
        name="btnradio"
        id="myWaveRadio"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="fnt-caption custom-radio p-2" htmlFor="myWaveRadio">
        MyWave
      </label>
    </div>
  );
}
