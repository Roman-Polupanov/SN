import { Avatar, AvatarGroup } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { stringAvatar } from '../../helpers';

const Followers = ({ users }) => (
  <AvatarGroup max={3}>
    {
       users.map((item) => (item.avatar?.url
         ? <Avatar alt="user-avatar" src={item.avatar.url} />
         : <Avatar {...stringAvatar(item.login || item?.nick)} />))
    }
  </AvatarGroup>
);

export default Followers;
