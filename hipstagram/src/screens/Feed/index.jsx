import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/authContext';
import Followers from '../../components/Followers';
import UsersList from '../../components/UsersList';
import PostsList from '../../components/PostsList';
import { LIKE_POST } from '../../queries';

export default function Feed() {
  const { userData } = useAuth();
  const { following } = userData;
  const navigate = useNavigate();

  const followingIds = (following || []).map(({ _id }) => _id);
  const [createLike] = useMutation(LIKE_POST);

  const renderPosts = () => (
    <>
      <Followers users={following || []} />
      <PostsList usersIds={followingIds} />
    </>
  );

  const likePost = (postData) => {
    createLike({
      variables: {
        like: {
          post: {
            _id: postData._id,
          },
          user: {
            _id: userData._id,
          },
        },
      },
    });
  };

  return (
    following?.length ? renderPosts() : <UsersList onSelect={({ _id }) => navigate(`/user/${_id}`)} onLikeClick={likePost} />
  );
}
