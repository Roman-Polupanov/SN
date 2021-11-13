import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';



const MyPosts = (props) => {

  let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPost(text);
  }

  return (
    <div className={s.container}>
      <h3> MyPosts </h3>
      <div className>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>add Post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElement}
      </div>

    </div>
  )
}

export default MyPosts;