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
  const [flag, setFlag] = useState({
    flagTitle: 1,
    flagAlbum: 1,
    flagPopularity: 1,
    flagDuration: 1,
  });

  const handleSortByTitleAndArtist = () => {
    switch (flag.flagTitle) {
      case 0:
        setTitle("Title");
        setIcon("");
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        setTitle("Title");
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag({
          flagTitle: 2,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 2:
        setTitle("Title");
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag({
          flagTitle: 3,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 3:
        setTitle("Artist");
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag({
          flagTitle: 4,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 4:
        setTitle("Artist");
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag({
          flagTitle: 0,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      default:
        break;
    }
    sortByTitleAndArtist();
  };

  const handleSortByAlbum = () => {
    switch (flag.flagAlbum) {
      case 0:
        setIcon("");
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 2,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 2:
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 0,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      default:
        break;
    }
    sortByAlbum();
  };

  const handleSortByPopularity = () => {
    switch (flag.flagPopularity) {
      case 0:
        setIcon("");
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 2,
          flagDuration: 1,
        });
        break;
      case 2:
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 0,
          flagDuration: 1,
        });
        break;
      default:
        break;
    }
    sortByPopularity();
  };

  const handleSortByDuration = () => {
    switch (flag.flagDuration) {
      case 0:
        setIcon("");
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        setIcon(<i className="fas fa-caret-down fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 2,
        });
        break;
      case 2:
        setIcon(<i className="fas fa-caret-up fnt-light" />);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 0,
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
            orderIcon={flag.flagTitle === 1 ? "" : icon}
          />
        </div>
        <div className="col col-3">
          <SorterElement
            title="Album"
            handleClick={handleSortByAlbum}
            orderIcon={flag.flagAlbum === 1 ? "" : icon}
          />
        </div>
        <div className="col col-2">
          <SorterElement
            title="Popularity"
            handleClick={handleSortByPopularity}
            orderIcon={flag.flagPopularity === 1 ? "" : icon}
          />
        </div>
        <div className="col col-2">
          <SorterElement
            title="Duration"
            handleClick={handleSortByDuration}
            orderIcon={flag.flagDuration === 1 ? "" : icon}
          />
        </div>
      </div>
      <hr className="fnt-light" />
    </div>
  );
}

export default TrackSorter;
