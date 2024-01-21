import React from "react";

const Bell = ({ notificationCount }) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-bell-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
    </svg>
    {notificationCount > 0 && (
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "-5px", // Adjust the right position
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          width: "14px", // Adjust the width to make it smaller
          height: "14px", // Adjust the height to make it smaller
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "10px", // Adjust the font size to make it smaller
        }}
      >
        {notificationCount}
      </div>
    )}
  </div>
);

export default Bell;
