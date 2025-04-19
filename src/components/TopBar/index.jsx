import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("");

  // Tên cá nhân bên trái
  const yourName = "Nguyễn Quốc Việt";

  // Trích userId từ URL bằng matchPath
  const userMatch = matchPath({ path: "/users/:userId" }, location.pathname) ||
                    matchPath({ path: "/photos/:userId" }, location.pathname);

  const userId = userMatch?.params?.userId;

  useEffect(() => {
    async function fetchUserName() {
      if (!userId) {
        setUserName("");
        return;
      }

      try {
        const response = await fetch(`/user/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setUserName(`${user.first_name} ${user.last_name}`);
        } else {
          setUserName("");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUserName("");
      }
    }

    fetchUserName();
  }, [userId]);

  let rightText = "";
  if (location.pathname.includes("/photos")) {
    rightText = userName ? `Photos of ${userName}` : "";
  } else if (location.pathname.includes("/users/")) {
    rightText = userName;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          {yourName}
        </Typography>
        <Typography variant="h6" color="inherit">
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
