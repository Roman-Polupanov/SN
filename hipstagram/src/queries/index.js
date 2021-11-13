import { gql } from '@apollo/client';
import axios from 'axios';

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
