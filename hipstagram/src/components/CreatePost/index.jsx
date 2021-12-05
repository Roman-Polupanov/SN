import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { CREATE_POST, loadFile } from '../../queries';

const CreatePost = (props) => {
  //   const [createImage] = useMutation(CREATE_IMAGE);
  const [createPost, { data: createdPostData }] = useMutation(CREATE_POST);
  const uploadFileFormRef = React.useRef();
  const fileRef = React.useRef();
  const [previewUrl, setPreviewUrl] = useState();
  const [formData, setFormData] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (createdPostData?.PostUpsert) {
      props.onSuccess(createdPostData?.PostUpsert);
    }
  }, [createdPostData]);

  const onChange = () => {
    // Assuming only image
    const file = fileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {previewUrl && (
          <img
            width="200"
            height="200"
            src={`${previewUrl}`}
            alt="img-preview"
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <form ref={uploadFileFormRef} encType="multipart/form-data">
          <Button
            component="label"
            variant="outlined"
          >
            Add post image
            <input
              ref={fileRef}
              accept="image/png, image/jpeg"
              type="file"
              name="photo"
              onChange={() => {
                onChange();
                setFormData(new FormData(uploadFileFormRef.current));
              }}
              hidden
            />

          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!formData}
          variant="contained"
          onClick={() => {
            loadFile(formData)
              .then((data) => {
                createPost({
                  variables: {
                    post: { title, text: description, images: [{ _id: data._id }] },
                  },
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Publish
        </Button>
      </Grid>

    </Grid>
  );
};

export default CreatePost;
