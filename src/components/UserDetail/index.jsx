import React, { useEffect, useState } from "react";
import { Typography, Paper, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define UserDetail, a React component of PhotoApp.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = models.userModel(userId);
    setUser(userData);
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="user-detail-container">
      <Typography variant="h5" gutterBottom>
        Thông tin người dùng: {user.first_name} {user.last_name}
      </Typography>
      <Paper elevation={0} className="user-detail-card" sx={{ padding: 2 }}>
        <Typography variant="body1">
          <strong>Địa chỉ:</strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>Nghề nghiệp:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Mô tả:</strong> {user.description}
        </Typography>
        <Typography sx={{ marginTop: 2 }}>
          <Link component={RouterLink} to={`/photos/${user._id}`}>
            Xem ảnh người dùng {user.first_name}
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default UserDetail;
