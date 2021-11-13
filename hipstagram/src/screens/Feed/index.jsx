import React from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { FIND_USERS_IMAGES_QUERY } from '../../queries';
import PhotoCard from '../../components/PhotoCard';

export default function Feed() {
  const { data, loading } = useQuery(FIND_USERS_IMAGES_QUERY, { fetchPolicy: 'cache-first' });

  if (loading) {
    return <LinearProgress />;
  }

  if (!data?.ImageFind || data.ImageFind.length === 0) {
    return <div>Your feed is empty</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {data.ImageFind
            .filter((item) => item.url)
            .map((item) => (
              <Grid item xs>
                <PhotoCard
                  nick={item.owner.nick || item.owner.login}
                  createdAt={item.createAt}
                  url={item.url}
                  text={item.text || 'No description'}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
