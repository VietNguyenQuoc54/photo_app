import React from 'react';
import { useParams } from 'react-router-dom';
import models from '../../modelData/models';

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user =models.userModel(userId);

  return (
    <div>
      <h2>Ảnh của {user.first_name} {user.last_name}</h2>
      {photos.length === 0 ? (
        <p>Không có ảnh nào!.</p>
      ) : (
        photos.map(photo => (
          <div key={photo._id} style={{ marginBottom: '20px' }}>
            <img
              src={`/images/${photo.file_name}`}
              alt="user"
              style={{ maxWidth: '400px', display: 'block', marginBottom: '10px' }}
            />
            <div>Đăng lúc: {new Date(photo.date_time).toLocaleString()}</div>

            {photo.comments && photo.comments.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong>Bình luận:</strong>
                <ul>
                  {photo.comments.map(comment => (
                    <li key={comment._id} style={{ borderBottom: 'none' }}>
                      <strong>{comment.user.first_name}:</strong> {comment.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserPhotos;
