import {
  Card, CardActions, CardContent, Grid, IconButton, Typography,
} from '@mui/material';
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MessageIcon from '@mui/icons-material/Message';
import { useMutation } from '@apollo/client';
import UserAvatar from '../UserAvatar';
import Comments from '../Comments';
import { CREATE_COMMENT } from '../../queries';

const PostCard = (props) => {
  const [publishComment] = useMutation(CREATE_COMMENT);
  const userName = props.owner?.login || props.owner?.nick;
  const [likesCount, setLikesCount] = React.useState(props.likes?.length ?? 0);
  const [isAlreadyLiked, setIsAlreadyLiked] = React.useState(props.isLiked);
  const navigate = useNavigate();
  const [isCommentsShown, setIsCommentsShown] = React.useState(false);
  const [publishedComments, setPublishedComments] = React.useState(props.comments || []);

  return (
    <Card key={JSON.stringify(props._id)} sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={isCommentsShown ? 8 : 12}>
            <Grid
              container
              spacing={2}
              mb={2}
              onClick={() => {
                navigate(`/user/${props.owner._id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <Grid item>
                <UserAvatar {...props.owner} />
              </Grid>
              <Grid item>
                <Typography>
                  <strong>
                    {userName}
                  </strong>
                </Typography>
                <Typography>
                  {props.title}
                </Typography>

              </Grid>
            </Grid>
            <Carousel showThumbs={false} centerMode emulateTouch>
              {
                props.images.map((image) => (
                  <img
                    key={image._id}
                    src={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                    srcSet={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                    alt={props.text || 'feed-image'}
                    loading="lazy"
                  />
                ))
              }
            </Carousel>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography mt={2}>
                {props.text}
              </Typography>
              <CardActions>
                <IconButton
                  onClick={() => {
                    setIsCommentsShown(!isCommentsShown);
                  }}
                >
                  {publishedComments.length > 0
                    ? (
                      <>
                        {publishedComments.length}
                        &nbsp;
                        <MessageIcon />
                      </>
                    ) : <ChatBubbleOutlineIcon />}
                </IconButton>
                <IconButton
                  sx={{ color: isAlreadyLiked ? '#CD1818' : 'black' }}
                  onClick={() => {
                    if (isAlreadyLiked) return;
                    props.onLikeClick(props);
                    setLikesCount(likesCount + 1);
                    setIsAlreadyLiked(true);
                  }}
                >
                  {likesCount || ''}
                  {' '}
                  {isAlreadyLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

              </CardActions>
            </Grid>
          </Grid>
          {isCommentsShown && (
            <Grid item xs={12} md={4} padding={2}>
              <Comments
                comments={publishedComments}
                onPublish={(text) => {
                  publishComment({
                    variables: {
                      comment: {
                        post: {
                          _id: props._id,
                        },
                        text,
                      },
                    },
                  }).then(({ data }) => {
                    setPublishedComments([...publishedComments, data.CommentUpsert]);
                  }).catch((error) => {
                    console.log(error);
                  });
                }}
              />
            </Grid>
          )}
        </Grid>

      </CardContent>
    </Card>
  );
};

export default PostCard;
