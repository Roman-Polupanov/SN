import { useLazyQuery, useMutation } from '@apollo/client';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostsList from '../../components/PostsList';
import UserInfoCard from '../../components/UserInfoCard';
import { useAuth } from '../../context/authContext';
import { FIND_USER, LIKE_POST, UPDATE_USER } from '../../queries';

const Profile = () => {
  const { id } = useParams();
  const { userData: myProfileData } = useAuth();
  const [findUser, { data: findUserResponse, loading }] = useLazyQuery(FIND_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [createLike] = useMutation(LIKE_POST);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === myProfileData._id) {
      navigate('my-profile');
    } else {
      findUser({
        variables: {
          query: JSON.stringify([{
            _id: id,
          }]),
        },
      });
    }
  }, []);
  const userInfoCardProps = findUserResponse?.UserFind?.[0];
  const isSubscribed = myProfileData
    ?.following
    ?.some((user) => user?._id === userInfoCardProps?._id);
  const subscribeToUserProfile = (userIdToSubscribe) => {
    updateUser({
      variables: {
        user: {
          _id: myProfileData._id,
          following: [
            ...(myProfileData.following || []).map(({ _id }) => ({ _id })),
            { _id: userIdToSubscribe }],
        }
        ,
      },
    });
  };
  const likePost = (postData) => {
    createLike({
      variables: {
        like: {
          post: {
            _id: postData._id,
          },
          user: {
            _id: userInfoCardProps._id,
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
            {...userInfoCardProps}
            subscribable
            onSubscribe={subscribeToUserProfile}
            isSubscribed={isSubscribed}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <div style={{ overflow: 'auto' }}>
            <PostsList usersIds={[id]} onLikeClick={likePost} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
