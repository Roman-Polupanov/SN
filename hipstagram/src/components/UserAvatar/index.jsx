import { Avatar } from '@mui/material';
import React from 'react';
import { stringAvatar } from '../../helpers';

const UserAvatar = (props) => (props?.avatar?.url ? <Avatar alt="user-avatar" src={`http://hipstagram.asmer.fs.a-level.com.ua/${props?.avatar?.url}`} sx={props.style} />
  : <Avatar {...stringAvatar(props.login || props.nick, props.style)} />);

export default UserAvatar;
