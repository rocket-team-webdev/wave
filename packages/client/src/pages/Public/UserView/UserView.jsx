/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fromBottom } from "../../../utils/motionSettings";

import Layout from "../../../components/Layout";
import UserWave from "../../../components/UserWave";
import Spinner from "../../../components/Spinner";

import "./UserView.scss";

import { PUBLIC } from "../../../constants/routes";

import { getUserById } from "../../../api/users-api";

export default function UserView() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  const location = useLocation();

  // General
  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      setUser(data.data);
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

  useEffect(() => {
    // General
    loadUser();
  }, []);

  useEffect(() => {
    // General
    loadUser();
  }, [location.pathname]);

  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        <div className="col col-12 ps-0">
          {!isLoading ? (
            <div className="user-top d-flex justify-content-between">
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
