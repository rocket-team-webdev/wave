import React from "react";
import { motion } from "framer-motion";
import { containerAnimation } from "../../utils/motionSettings";
import BigUserCard from "../BigUserCard/BigUserCard";

function UserList({ users }) {
  return (
    <motion.div
      className="content d-flex flex-wrap container-fluid row row-cols-1 row-cols-md-2 p-0 m-0"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      {users.map((user) => (
        <BigUserCard user={user} key={`big-user-card-${user._id}`} />
      ))}
    </motion.div>
  );
}

export default UserList;
