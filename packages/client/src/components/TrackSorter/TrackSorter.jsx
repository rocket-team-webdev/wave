import React, { useState } from "react";
import SorterElement from "../SorterElement/SorterElement";

function TrackSorter({
  sortByTitleAndArtist,
  sortByAlbum,
  sortByPopularity,
  sortByDuration,
}) {
  const [title, setTitle] = useState("Title");
  const [icon, setIcon] = useState("");
  const [flag, setFlag] = useState(1);
  // const [sorter, setSorter] = useState({
  //   name: "",
  //   icon: "",
  //   flag: 1
  // })

  const changeTitleColumn = (pos) => {
    switch (pos) {
      case 0:
        setTitle("Title");
        setIcon("");
        setFlag(1);
        break;
      case 1:
        setTitle("Title");
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag(2);
        break;
      case 2:
        setTitle("Title");
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag(3);
        break;
      case 3:
        setTitle("Artist");
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag(4);
        break;
      case 4:
        setTitle("Artist");
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag(0);
        break;
      default:
        break;
    }
    return title;
  };

  const handleSortByTitleAndArtist = () => {
    changeTitleColumn(flag);
    sortByTitleAndArtist();
  };

  const handleSortByAlbum = () => {
    sortByAlbum();
  };

  const handleSortByPopularity = () => {
    sortByPopularity();
  };

  const handleSortByDuration = () => {
    sortByDuration();
  };

  return (
    <div className="row m-0 col col-12">
      <div className="col col-12 d-flex justify-content-between align-items-center py-2">
        <div
          type="button"
          className="m-0 px-2 fnt-song-bold d-flex align-items-center"
        >
          <h3 className="text-start fnt-sorter fnt-light me-1 m-0">#</h3>
        </div>
        <SorterElement
          title={title}
          handleClick={handleSortByTitleAndArtist}
          orderIcon={icon}
        />
        <SorterElement title="Album" handleClick={handleSortByAlbum} />
        <SorterElement
          title="Popularity"
          handleClick={handleSortByPopularity}
        />
        <SorterElement title="Duration" handleClick={handleSortByDuration} />
        {/* <button
          type="button"
          className="m-0 px-2 fnt-song-bold d-flex align-items-center"
        >
          <h3 className="text-start fnt-sorter fnt-light me-1 m-0">Album</h3>
          <i className="fas fa-caret-down fnt-light" />
        </button> */}
        {/* <button
          type="button"
          className="m-0 px-2 fnt-song-bold d-flex align-items-center"
        >
          <h3 className="text-start fnt-sorter fnt-light me-1 m-0">Plays</h3>
          <i className="fas fa-caret-down fnt-light" />
        </button> */}
        {/* <button
          type="button"
          className="m-0 px-2 fnt-song-bold d-flex align-items-center"
        >
          <h3 className="text-start fnt-sorter fnt-light me-1 m-0">Duration</h3>
          <i className="fas fa-caret-down fnt-light" />
        </button> */}
      </div>
      <hr className="fnt-light" />
    </div>
  );
}

export default TrackSorter;
