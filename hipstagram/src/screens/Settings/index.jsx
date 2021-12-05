import { useMutation } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import AvatarEditor from '../../components/AvatarEditor';
import { useAuth } from '../../context/authContext';
import { loadFile, UPDATE_USER } from '../../queries';

const Settings = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  const { userData } = useAuth();

  const onSave = (data) => {
    const formData = new FormData();
    formData.append('photo', data);

    loadFile(formData)
      .then((response) => {
        updateUser({
          variables: {
            user: { _id: userData._id, avatar: { _id: response._id } },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div" mb="16">
        Edit avatar
      </Typography>
      <AvatarEditor
        userData={userData}
        onSave={onSave}
      />
    </div>
  );
};

export default Settings;
