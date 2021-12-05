import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from '../../components/UsersList';

const FindUsers = () => {
  const navigate = useNavigate();

  return <UsersList onSelect={({ _id }) => navigate(`/user/${_id}`)} />;
};

export default FindUsers;
