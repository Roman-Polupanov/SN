import { useLazyQuery } from '@apollo/client';
import {
  Grid, InputAdornment, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchIcon from '@mui/icons-material/Search';
import { FIND_USER } from '../../queries';
import UserAvatar from '../UserAvatar';

const UsersList = (props) => {
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadUsers, { data: usersData }] = useLazyQuery(FIND_USER);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    loadUsers({
      variables: {
        query: JSON.stringify([
          { login: searchValue || undefined },
          { sort: [{ _id: -1 }] },
        ]),
      },
    });
  }, [searchValue]);

  useEffect(() => {
    setHasMore(usersData?.UserFind.length > 0);
    setUsers(users.concat(usersData?.UserFind).filter((item) => item));
  }, [usersData]);

  return (
    <>
      <Grid container mb={8} mt={8}>
        <TextField
          id="input-with-icon-textfield"
          label="User name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => { setSearchValue(e.target.value); setUsers([]); }}
          value={searchValue}
        />
      </Grid>
      <InfiniteScroll
        dataLength={users.length} // This is important field to render the next data
        next={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          loadUsers({
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
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {users.map((item) => (
          <Grid
            container
            style={{ cursor: 'pointer' }}
            spacing={2}
            mb={2}
            onClick={() => props.onSelect(item)}
            alignItems="center"
          >
            <Grid item>
              <UserAvatar style={{ width: 50, height: 50 }} {...item} />
            </Grid>
            <Grid item>
              <Typography>
                {item?.login || item?.nick}
              </Typography>
            </Grid>
          </Grid>
        ))}

      </InfiniteScroll>
    </>
  );
};

export default UsersList;
