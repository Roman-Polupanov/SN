import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import UserAvatar from '../UserAvatar';
import Followers from '../Followers';

export default function UserInfoCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item>
            <UserAvatar {...props} style={{ width: 70, height: 70 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5" gutterBottom component="div" color="text.primary">
              {props.login || props.nick}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h5" component="div">
              {props.followers?.length ?? 0}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              followers
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {props.following?.length ?? 0}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              following
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {props.likesCount ?? 0}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              likes
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {
              props.subscribable && (
                <Button
                  variant="contained"
                  disabled={props.isSubscribed}
                  size="medium"
                  onClick={() => {
                    props.onSubscribe(props._id);
                  }}
                >
                  {props.isSubscribed ? 'you subscribed' : 'subscribe'}
                </Button>
              )
          }
      </CardActions>
    </Card>
  );
}
