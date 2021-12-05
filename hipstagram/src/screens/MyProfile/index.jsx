import { useMutation } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import CreatePost from '../../components/CreatePost';
import PostsList from '../../components/PostsList';
import UserInfoCard from '../../components/UserInfoCard';
import { useAuth } from '../../context/authContext';
import { LIKE_POST } from '../../queries';

const MyProfile = () => {
  const { userData: myProfileData } = useAuth();
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const [createLike] = useMutation(LIKE_POST);
  const [newPost, setNewPost] = useState();
  const likePost = (postData) => {
    createLike({
      variables: {
        like: {
          post: {
            _id: postData._id,
          },
          user: {
            _id: myProfileData._id,
          },
        },
      },
    });
  };

  return (
    <div style={{ paddingTop: '32px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <UserInfoCard
            {...myProfileData}
            subscribable={false}
          />
          {
            isPostFormVisible ? (
              <CreatePost onSuccess={(data) => {
                setNewPost(data);
                setIsPostFormVisible(false);
              }}
              />
            )
              : (
                <Button style={{ marginTop: 16 }} variant="outlined" size="medium" onClick={() => setIsPostFormVisible(true)}>
                  Create Post
                </Button>
              )
          }

          { }
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <div style={{ overflow: 'auto' }}>
            <PostsList usersIds={[myProfileData._id]} onLikeClick={likePost} update={newPost} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfile;
