import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

  return (

    <div className={s.item}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F6t5qwIu2HSL5Ge-efXz_EH_h47yA5Ntwg&usqp=CAU" />
      {props.message}
      <div>
        <button>Like {props.likesCount}</button>
      </div>

    </div>

  )
}

export default Post;