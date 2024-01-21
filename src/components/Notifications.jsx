import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../clients/axios";
import styles from "../styles/NavBar.module.css";
import Dropdown from "./Dropdown";
import Bell from "../icons/Bell";

const Notifications = () => {
  const { id } = useParams();
  const [notifications, setNotifications] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/notifications`);
      setNotifications(data.results);
      setUnreadNotifications(
        data.results.filter((notification) => !notification.read)
      );
    } catch (err) {
      console.error(err);
      // Handle error
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const markAsRead = useCallback(async () => {
    const formData = new FormData();
    formData.append("read", true);
    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          axiosReq.patch(`/notifications/${notification.id}`, formData)
        )
      );
      fetchData();
    } catch (err) {
      console.error(err);
      // Handle error
    }
  }, [unreadNotifications, fetchData]);

  return (
    <Dropdown
      options={notifications}
      newField="read"
      onOpen={() => markAsRead()}
      IconElement={
        <span className={styles.IconLink}>
          <Bell notificationCount={unreadNotifications.length} />
          <span className={styles.IconText}>Notifications</span>
        </span>
      }
    />
  );
};

export default Notifications;
