import axios from 'axios';
import { gql } from '@apollo/client';

export const SIGN_IN_QUERY = gql`
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
  return axios.post('/graphql', {
    query: `query Login {
      login(login: "${login}", password: "${password}")
    } `,
  }).then(({ data }) => data);
}

export const FIND_USERS_IMAGES_QUERY = gql`
  query findImage {
    ImageFind(query: "[{}]") {
      _id
      url
      text
      owner {
        login
        nick
      }
    }
  }`;

// export const FIND_ALL_USER_QUERY = gql`
//   query findUser {
//     UserFind(query: "[{}]") {
//       _id
//     createdAt
//     login
//     nick
//     avatar {
//       _id
//       url
//       text
//     }
//     likesCount
//     followers {
//         _id
//         login
//         nick
//       }
//     following {
//         _id
//         login
//         nick
//       }
//     }
//   }`;

// const iD = '619a17da2b1e9e2ba5de48fd'
// // eslint-disable-next-line quotes
// const idQuery = "[{\"_id\":\"619a17da2b1e9e2ba5de48fd\"}]";
export const FIND_USER_PAGE_QUERY = gql`
query findUserOne($userQuery:String!) {
  UserFind(query: $userQuery) {
#     _id
#   createdAt
#   login
#   nick
#   avatar {
#     _id
#     url
#     text
#   }
#   likesCount
#   followers {
#       _id
#       login
#       nick
#     }
#   following {
#       _id
#       login
#       nick
#     }
#   }
# }`;
