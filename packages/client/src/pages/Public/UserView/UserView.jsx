import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fromBottom } from "../../../utils/motionSettings";

import Layout from "../../../components/Layout";
import UserWave from "../../../components/UserWave";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";

import "./UserView.scss";

import { PUBLIC } from "../../../constants/routes";

import { getUserById, followUser } from "../../../api/users-api";
import { getMyFollowings } from "../../../api/me-api";

import { generatePossessive } from "../../../utils/possessiveFunction";

export default function UserView() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAppUser, setIsAppUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState({});
  const [userPossessive, setUserPossessive] = useState([]);
  const [docTitle, setDocTitle] = useState("Loading user");

  const history = useHistory();

  const userState = useSelector((state) => state.user);

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  const location = useLocation();

  // General
  const handleIsAppUser = () => {
    if (userId === userState.mongoId) {
      setIsAppUser(true);
    }
  };
  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      handleIsAppUser();
      setUser(data.data);
      setUserPossessive(generatePossessive(data.data.firstName));
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 500) {
        toast("User not found", {
          type: "error",
        });
        setIsLoading(false);
        history.push(PUBLIC.NOT_FOUND);
      } else {
        setIsLoading(false);
        toast(error.message, { type: "error" });
      }
    }
  };

  const loadIsFollowing = async () => {
    const { data } = await getMyFollowings();
    data.data.forEach((following) => {
      if (following._id === userId) {
        setIsFollowing(true);
      }
    });
  };

  // Follow user
  const handleFollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(!isFollowing);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    // General
    loadUser();
    loadIsFollowing();
  }, []);

  useEffect(() => {
    setIsAppUser(false);
    setIsFollowing(false);

    // General
    loadUser();
    loadIsFollowing();
  }, [location.pathname]);

  useEffect(() => {
    loadIsFollowing();
  }, [isFollowing]);

  useEffect(() => {
    setDocTitle(userPossessive);
  }, [userPossessive]);

  return (
    <Layout docTitle={docTitle} isNegative>
      <div className="row p-0 g-4 pt-4 pt-md-0 ">
        <div className="col col-12 ps-0">
          {!isLoading ? (
            <div className="mb-3 ps-2 ps-md-0 mb-md-4">
              <div className="user-top d-flex justify-content-between p-0 m-0 mb-3">
                {/* Username */}

                <motion.h1
                  className="fnt-page-title text-break truncate"
                  variants={fromBottom}
                  initial="hidden"
                  animate="visible"
                >
                  {`${user.firstName} ${user.lastName}`.toUpperCase()}
                </motion.h1>
                <motion.img
                  className="user-profile-picture fx-rounded"
                  variants={fromBottom}
                  initial="hidden"
                  animate="visible"
                  src={user.profilePicture}
                  alt={user.firstName}
                />
              </div>
              {!isAppUser && (
                <>
                  {isFollowing ? (
                    <Button isSmall isNegative handleClick={handleFollow}>
                      Following
                    </Button>
                  ) : (
                    <Button isSmall handleClick={handleFollow}>
                      Follow
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            <Spinner isNegative />
          )}

          {/* Bottom */}
          <div className="row">
            <UserWave />
          </div>
        </div>
      </div>
    </Layout>
  );
}
