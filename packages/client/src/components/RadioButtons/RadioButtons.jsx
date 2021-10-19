import React from "react";

export default function RadioButtons({ handleChange = () => {} }) {
  return (
    <div
      className="btn-group home-radio"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="popularRadio"
        autoComplete="off"
        onChange={handleChange}
        defaultChecked
      />
      <label className="btn fnt-caption custom-radio" htmlFor="popularRadio">
        Popular
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="myWaveRadio"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="btn  fnt-caption custom-radio" htmlFor="myWaveRadio">
        MyWave
      </label>
    </div>
  );
}
