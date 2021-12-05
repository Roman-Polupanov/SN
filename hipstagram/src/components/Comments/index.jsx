import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import UserAvatar from '../UserAvatar';

function Comments(props) {
  const [commentValue, setCommentValue] = useState('');
  const renderComments = () => (
    <Grid container flexDirection="column">
      {
            props.comments.map((comment) => (
              <Grid item>
                <Grid container wrap="nowrap" justifyContent="space-between">
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <UserAvatar
                              style={{ height: 30, width: 30 }}
                              {...(comment.owner || {})}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle" component="div"><strong>{comment?.owner?.login}</strong></Typography>
                            <Typography variant="caption" component="div">
                              {comment.createdAt
                            && new Date(Number(comment.createdAt)).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle">
                          {comment?.text}
                        </Typography>
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
              </Grid>
            ))
        }
    </Grid>
  );

  return (
    <Grid container height="100%" flexDirection="column" justifyContent="space-between">
      {props.comments.length > 0 && (
      <Grid item>
        <div style={{ height: 400, overflow: 'auto', marginBottom: 16 }}>
          {
          renderComments()
        }
        </div>
      </Grid>
      )}
      {props.comments.length === 0 && <Grid item><Typography variant="caption">No comments yet</Typography></Grid>}
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!commentValue}
              variant="outlined"
              onClick={() => {
                if (commentValue) {
                  props.onPublish(commentValue);
                }
              }}
            >
              Publish

            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Comments;
