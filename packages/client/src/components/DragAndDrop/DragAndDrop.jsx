import React, { useRef, useEffect, useState } from "react";
import AddIcon from "../SVGicons/AddIcon";

import "./DragAndDrop.scss";

export default function DragAndDrop({ handleDropEvent, children }) {
  const dropRef = useRef([]);
  const [draggable, setDraggable] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e) => {
    console.log("handleDrag");

    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    // console.log("handleDragIn");
    e.preventDefault();
    e.stopPropagation();
    // this.dragCounter++;
    setDragCounter((prevCount) => prevCount + 1);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDraggable(true);
    }
  };

  const handleDragOut = (e) => {
    // console.log("handleDragOut");

    e.preventDefault();
    e.stopPropagation();
    // this.dragCounter--;
    setDragCounter((prevCount) => prevCount - 1);

    // if (this.dragCounter === 0) {
    //   setDraggable(false);
    // }
    if (dragCounter === 0) {
      setDraggable(false);
    }
  };

  const handleDrop = (e) => {
    console.log("handleDrop");

    e.preventDefault();
    e.stopPropagation();
    setDraggable(false);

    console.log("e.dataTransfer.files", e.dataTransfer.files);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDropEvent(e.dataTransfer.files);
      e.dataTransfer.clearData();

      // this.dragCounter = 0;
      setDragCounter(0);
    }
  };

  useEffect(() => {
    const div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);

    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  let classNames =
    "drop-container d-flex flex-column align-items-center pt-4 m-auto ";

  if (draggable) classNames += "drag";
  else classNames += "clr-light-20";

  return (
    <div className={classNames} ref={dropRef}>
      <AddIcon color="white" size={150} />

      {/* {draggable && (
        <div
          style={{
            border: "dashed grey 4px",
            backgroundColor: "rgba(255,255,255,.8)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              left: 0,
              textAlign: "center",
              color: "grey",
              fontSize: 36,
            }}
          >
            <div>drop here :)</div>
          </div>
        </div>
      )} */}
      {children}
    </div>
  );
}
