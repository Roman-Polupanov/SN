import React, { useRef, useState } from 'react';
import Editor from 'react-avatar-editor';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { Grid } from '@mui/material';
import UserAvatar from '../UserAvatar';

export default function AvatarEditor(props) {
  const [state, setState] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    rotate: 0,
    croppedImg: props.avatarUrl,
  });

  const editorRef = useRef(null);
  const inputRef = useRef(null);

  function handleZoomSlider(event, value) {
    setState((prev) => ({ ...prev, zoom: value }));
  }

  function handleFileChange(e) {
    window.URL = window.URL || window.webkitURL;
    const url = window.URL.createObjectURL(e.target.files[0]);

    inputRef.current.value = '';
    setState((prev) => ({ ...prev, img: url, cropperOpen: true }));
  }

  function handleCancel() {
    setState((prev) => ({ ...prev, cropperOpen: false }));
  }

  function rotateLeft() {
    setState((prev) => ({ ...prev, rotate: (prev.rotate - 90) % 360 }));
  }

  function rotateRight() {
    setState((prev) => ({ ...prev, rotate: (prev.rotate + 90) % 360 }));
  }

  function handleSave(e) {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      const blobBin = atob(croppedImg.split(',')[1]);
      const array = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
      props.onSave(file);

      setState((prev) => {
        const data = { ...prev, cropperOpen: false, croppedImg };

        return data;
      });
    }
  }

  return (
    <Grid container spacing={2} flexDirection="column">
      <Grid item>
        <UserAvatar {...props.userData} style={{ width: 150, height: 150 }} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          label="Upload an Image"
          labelPosition="before"
          containerElement="label"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </Button>
      </Grid>

      {state.cropperOpen && (
      <div
        className="cropper-wrapper"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(200,200,200,.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Editor
          ref={editorRef}
          image={state.img}
          width={200}
          height={200}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          rotate={state.rotate}
          scale={state.zoom}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label
            style={{
              fontSize: 12,
              marginRight: 10,
              paddingBottom: 22,
              fontWeight: 600,
            }}
          >
            Zoom
          </label>
          <Slider
            min={1}
            max={10}
            step={0.1}
            value={state.zoom}
            onChange={handleZoomSlider}
            style={{ width: 200 }}
          />
        </div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <label
              style={{
                fontSize: 12,
                marginRight: 10,
                paddingBottom: 22,
                fontWeight: 600,
              }}
            >
              Rotate
            </label>
          </Grid>
          <Grid item>
            <Button onClick={rotateLeft}>Left</Button>
          </Grid>
          <Grid item>
            <Button onClick={rotateRight}>Right</Button>
          </Grid>

        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>

        </Grid>
      </div>
      )}
    </Grid>
  );
}
