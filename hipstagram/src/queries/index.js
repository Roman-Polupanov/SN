import { gql } from '@apollo/client';
import axios from 'axios';

export const SIGN_UP = gql`
  mutation SignIn($login: String!, $password: String!) {
    createUser(login: $login, password: $password) {
        _id,
        login,
    }
  }`;

// INCORRECT response schema on backend that's why use axious to login
// export const LOGIN_QUERY = gql`
//   query Login($login: String!, $password: String!) {
//     login(login: $login, password: $password)
//   }`;

export function loginUser(login, password) {
  return axios.post('http://hipstagram.asmer.fs.a-level.com.ua/graphql', {
    query: `query Login {
      login(login: "${login}", password: "${password}")
    } `,
  }).then(({ data }) => data);
}

export const FIND_USERS_IMAGES_QUERY = gql`
  query findImage($query: String!) {
    ImageFind(query: $query) {
      _id
      url
      text
      owner {
        login
        nick
      }
    }
  }`;

export const FIND_POSTS_QUERY = gql`
  query findPosts($query: String!) {
    PostFind(query: $query) {
      _id
      title
      text
      owner {
        _id
        login
        nick
        avatar {
            url
        }
      }
      likesCount
      likes {
        _id
        owner {
          _id
          login
        }
      }
      images {
        _id,
        url,
        text
      }
      comments {
        text
        createdAt
        owner {
          login
          nick
        }
      }
    }
  }`;

export const FIND_USER = gql`
  query findUser($query: String!) {
    UserFind(query: $query) {
      _id,
      createdAt,
      login,
      nick,
      likesCount,
      likes {
        _id
      }
      avatar {
        url
      }
      followers {
        _id,
        login,
        nick,
        avatar {
          url
        }
      }
      following {
        _id,
        login,
        nick,
        avatar {
          url
        }
      }
    }
}`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $user: UserInput) {
      UserUpsert(user: $user) {
        _id,
        createdAt,
        login,
        nick,
        likesCount,
        likes {
          _id
        }
        avatar {
          url
        }
        followers {
          _id,
          login,
          nick,
          avatar {
            url
          }
        }
        following {
          _id,
          login,
          nick,
          avatar {
            url
          }
        }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($post: PostInput!) {
    PostUpsert(post: $post) {
      _id
      title
      text
      owner {
        login
        nick
        avatar {
            url
        }
      }
      likesCount
      images {
        _id,
        url,
        text
      }
      comments {
        text
        owner {
          login
          nick
        }
      }
    }
  }`;

export const CREATE_POST = gql`
  mutation createPost($post: PostInput!) {
    PostUpsert(post: $post) {
      _id,
      createdAt
      title
      text
      images { _id, url }
      likes { _id, owner { _id, login} }
      owner { _id, login }
    }
}`;

export const CREATE_IMAGE = gql`
  mutation createImage($image: ImageInput!) {
    ImageUpsert(image: $image) {
      _id
    }
}`;

export const LIKE_POST = gql`
  mutation likePost($like: LikeInput!) {
    LikeUpsert(like: $like) {
      _id
    }
  }`;

export const CREATE_COMMENT = gql`
  mutation createComment($comment: CommentInput!) {
    CommentUpsert(comment: $comment) {
      _id,
      text,
      createdAt
      post {
        _id
      }
      owner {
        login
        avatar {
          url
        }
      }
    }
  }`;

export function loadFile(formData) {
  return fetch('/upload', {
    method: 'POST',
    headers: localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {},
    body: formData,
  }).then((res) => res.json());
}
