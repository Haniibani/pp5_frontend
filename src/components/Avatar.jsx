import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export const AvatarNavItem = ({ src, height = 45, text }) => {
  return (
    <span className={styles.AvatarContainer}>
      <img
        className={styles.AvatarNavItem}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
