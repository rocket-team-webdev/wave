import React, { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import SorterElement from "../SorterElement/SorterElement";

function TrackSorter({
  sortByTitleAndArtist,
  sortByAlbum,
  sortByPopularity,
  sortByDuration,
}) {
  const flagInitialState = {
    flagTitle: "titleDesc",
    flagAlbum: "albumDesc",
    flagPopularity: "popDesc",
    flagDuration: "durDesc",
  };
  const [title, setTitle] = useState("Title");
  const [icon, setIcon] = useState("");
  const [flag, setFlag] = useState(flagInitialState);

  const handleSortByTitleAndArtist = () => {
    switch (flag.flagTitle) {
      case "none":
        setTitle("Title");
        setIcon("");
        setFlag(flagInitialState);
        break;
      case "titleDesc":
        setTitle("Title");
        setIcon(<FaCaretDown className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagTitle: "titleAsc",
        });
        break;
      case "titleAsc":
        setTitle("Title");
        setIcon(<FaCaretUp className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistDesc",
        });
        break;
      case "artistDesc":
        setTitle("Artist");
        setIcon(<FaCaretDown className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistAsc",
        });
        break;
      case "artistAsc":
        setTitle("Artist");
        setIcon(<FaCaretUp className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagTitle: "none",
        });
        break;
      default:
        break;
    }
    sortByTitleAndArtist();
  };

  const handleSortByAlbum = () => {
    switch (flag.flagAlbum) {
      case "none":
        setIcon("");
        setFlag(flagInitialState);
        break;
      case "albumDesc":
        setIcon(<FaCaretDown className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagAlbum: "albumAsc",
        });
        break;
      case "albumAsc":
        setIcon(<FaCaretUp className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagAlbum: "none",
        });
        break;
      default:
        break;
    }
    sortByAlbum();
  };

  const handleSortByPopularity = () => {
    switch (flag.flagPopularity) {
      case "none":
        setIcon("");
        setFlag(flagInitialState);
        break;
      case "popDesc":
        setIcon(<FaCaretDown className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagPopularity: "popAsc",
        });
        break;
      case "popAsc":
        setIcon(<FaCaretUp className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagPopularity: "none",
        });
        break;
      default:
        break;
    }
    sortByPopularity();
  };

  const handleSortByDuration = () => {
    switch (flag.flagDuration) {
      case "none":
        setIcon("");
        setFlag(flagInitialState);
        break;
      case "durDesc":
        setIcon(<FaCaretDown className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagDuration: "durAsc",
        });
        break;
      case "durAsc":
        setIcon(<FaCaretUp className="fnt-light" />);
        setFlag({
          ...flagInitialState,
          flagDuration: "none",
        });
        break;
      default:
        break;
    }
    sortByDuration();
  };

  return (
    <div className="row m-0 col col-12">
      <div className="col col-12 d-flex justify-content-between align-items-center py-2">
        <div className="col col-2 m-0 px-2 fnt-song-bold d-flex align-items-center">
          <h3 className="text-start fnt-sorter fnt-light me-1 m-0">#</h3>
        </div>
        <div className="col col-3">
          <SorterElement
            title={title}
            handleClick={handleSortByTitleAndArtist}
            orderIcon={flag.flagTitle === "titleDesc" ? "" : icon}
          />
        </div>
        <div className="col col-3">
          <SorterElement
            title="Album"
            handleClick={handleSortByAlbum}
            orderIcon={flag.flagAlbum === "albumDesc" ? "" : icon}
          />
        </div>
        <div className="col col-2">
          <SorterElement
            title="Popularity"
            handleClick={handleSortByPopularity}
            orderIcon={flag.flagPopularity === "popDesc" ? "" : icon}
          />
        </div>
        <div className="col col-2">
          <SorterElement
            title="Duration"
            handleClick={handleSortByDuration}
            orderIcon={flag.flagDuration === "durDesc" ? "" : icon}
          />
        </div>
      </div>
      <hr className="fnt-light" />
    </div>
  );
}

export default TrackSorter;
