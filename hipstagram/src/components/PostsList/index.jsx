import { useLazyQuery } from '@apollo/client';
import { LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../../context/authContext';
import { FIND_POSTS_QUERY } from '../../queries';
import PostCard from '../PostCard';

const PostsList = (props) => {
  const { userData } = useAuth();
  const [hasMore, setHasMore] = useState(false);
  const [itemsPage, setItemsPage] = useState(0);
  const [feedItems, setFeedItems] = useState([]);
  const [loadPosts, { data: posts, loading }] = useLazyQuery(FIND_POSTS_QUERY, { fetchPolicy: 'network-only' });

  useEffect(() => {
    const copy = feedItems.slice();
    copy.unshift(props.update);
    setFeedItems(copy);
  }, [props.update]);

  useEffect(() => {
    loadPosts({
      variables: {
        query: JSON.stringify([
          {},
          { sort: [{ _id: -1 }] },
        ]),
      },
    });
  }, []);

  const requestNextPosts = () => {
    const nextPage = itemsPage + 1;
    setItemsPage(nextPage);
    loadPosts({
      variables: {
        query: JSON.stringify([
          {},
          {
            skip: [nextPage * 100],
            sort: [{ _id: -1 }],
          },
        ]),
      },
    });
  };

  useEffect(() => {
    const stillHasMore = posts?.PostFind.length > 0;
    const mergedList = [
      ...feedItems,
      ...posts?.PostFind.filter((item) => {
        const hasImage = item.images?.length;
        const relatedToUsersIds = props.usersIds?.length
          ? props.usersIds.includes(item.owner?._id) : true;

        return hasImage && relatedToUsersIds;
      }) ?? [],
    ];

    if (stillHasMore && mergedList.length === feedItems.length) {
      requestNextPosts();
    }

    setFeedItems(mergedList);
    setHasMore(stillHasMore);
  }, [posts]);

  if (loading && feedItems.length === 0) {
    return <LinearProgress />;
  }

  if (feedItems.length === 0) {
    return <Typography>No posts yet</Typography>;
  }

  return (
    <InfiniteScroll
      dataLength={feedItems.length}
      next={requestNextPosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {
  feedItems
    .map((item) => (
      <div
        key={item._id}
        style={{
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 24,
        }}
      >
        <PostCard
          {...item}
          onLikeClick={props.onLikeClick}
          isLiked={item.likes.some((like) => like?.owner?._id === userData?._id)}
        />
      </div>
    ))
}
    </InfiniteScroll>
  );
};

export default PostsList;
