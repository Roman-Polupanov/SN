import React from 'react';
import { useQuery } from '@apollo/client';
import { Paper } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { FIND_USER_PAGE_QUERY } from '../../queries';

export default function UserPage() {
  // eslint-disable-next-line quotes
  const { data, loading } = useQuery(FIND_USER_PAGE_QUERY, { variables: { userQuery: "[{\"login\":\"jack\"}]" } });
  console.log('data allUsers', data);

  if (loading) {
    return <LinearProgress />;
  }

  if (!data?.UserFind || data.UserFind.length === 0) {
    return <div>Your user is empty</div>;
  }

  return (
    <div>
      <Paper style={{ backgroundImage: 'https://images.wallpaperscraft.ru/image/single/nissan_skyline_gtr_r34_sinij_vid_speredi_99436_1366x768.jpg' }}>
        {/* <Container component="main" maxWidth="md">
          <Typography
            component="h1"
            color="inherit"
            gutterBottom
          >
            my Profile
          </Typography>
          {data.UserFind
            .filter((item) => item.url)
            .map((item) => (
              <Grid item xs="12" md="4" sm="6">
                <Card
                  nick={item.nick}
                  login={item.login}
                  createdAt={item.createAt}
                  url={item.url}
                  text={item.text || 'No description'}
                  likesCount={item.likesCount}
                  avatar={item.url || item.text || item._id}
                  followers={item.login || item.nick || item._id}
                  following={item.login || item.nick || item._id}
                >
                </Card>
              </Grid>
            ))}
        </Container> */}
      </Paper>
    </div>
  );
}
