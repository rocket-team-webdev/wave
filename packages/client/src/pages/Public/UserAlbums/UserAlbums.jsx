import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import {
  getUserById,
  getUserAlbums,
  getUserLikedAlbums,
} from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";
import AlbumList from "../../../components/AlbumList/AlbumList";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

function UserAlbums() {
  const [loadStatus, setLoadStatus] = useState({
    userAlbums: false,
    likedAlbums: false,
  });
  const [userCreatedAlbums, setUserCreatedAlbums] = useState([]);
  const [userLikedAlbums, setUserLikedAlbums] = useState([]);
  const [userPossessive, setUserPossessive] = useState([]);
  const history = useHistory();

  const { userId } = useRouteMatch(
    `${PUBLIC.USER_VIEW}/:userId${PUBLIC.ALBUMS}`,
  ).params;

  const loadUser = async () => {
    try {
      const { data } = await getUserById(userId);
      setUserPossessive(
        data.data.firstName.slice(-1) === "s"
          ? `${data.data.firstName}'`
          : `${data.data.firstName}'s`,
      );
    } catch (error) {
      if (error.response.status === 500) {
        toast("User not found", {
          type: "error",
        });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const fetchCreatedAlbums = async () => {
    const init = 0;
    const limit = 12;
    try {
      const {
        data: { albums },
      } = await getUserAlbums(userId, init, limit);
      setUserCreatedAlbums(albums);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userAlbums: true }));
  };

  const fetchLikedAlbums = async () => {
    const init = 0;
    const limit = 12;
    try {
      const {
        data: { likedAlbums },
      } = await getUserLikedAlbums(userId, init, limit);
      setUserLikedAlbums(likedAlbums);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, likedAlbums: true }));
  };

  useEffect(() => {
    fetchCreatedAlbums();
    fetchLikedAlbums();
    loadUser();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText
            priText={`${userPossessive} Albums`}
            cols="12"
            isNegative
          />
        </div>
        <div className="d-flex justify-content-start justify-content-md-end col col-12 col-md-3 mb-4 mb-md-0">
          <div className="p-0 mt-2">
            <BackButton isNegative />
          </div>
        </div>
      </div>

      <div className="row g-5">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {loadStatus.userAlbums ? (
            userCreatedAlbums && <AlbumList albums={userCreatedAlbums} />
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {loadStatus.likedAlbums ? (
            userLikedAlbums && <AlbumList albums={userLikedAlbums} />
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserAlbums;
