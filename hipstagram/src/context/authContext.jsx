import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '../constants';
import { parseJwt } from '../helpers';
import { FIND_USER, loginUser, SIGN_UP } from '../queries';

const AuthContext = React.createContext({
  isAuthorized: false,
  userData: {},
});

export const AuthProvider = (props) => {
  const [createUser] = useMutation(SIGN_UP);
  const [findUser, { data: findUserResponse, loading }] = useLazyQuery(FIND_USER);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN));
  const [authError, setAuthError] = useState();

  useEffect(() => {
    const parsedToken = token && parseJwt(token);
    const userId = parsedToken?.sub?.id;

    if (userId) {
      findUser({
        variables: {
          query: JSON.stringify([{
            _id: userId,
          }]),
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const isUserExist = findUserResponse?.UserFind?.length > 0;
    const user = isUserExist && findUserResponse.UserFind[0];

    setIsAuthorized(Boolean(user));
    setUserData(user || {});
  }, [findUserResponse]);

  const storeToken = (data) => {
    localStorage.setItem(AUTH_TOKEN, data);
    setToken(data);
  };
  const signIn = async (login, password) => {
    try {
      const { data: { login: jwt } } = await loginUser(login, password);
      if (jwt) {
        storeToken(jwt);
      } else {
        throw new Error('wrong credentials');
      }
    } catch (error) {
      setIsAuthorized(false);
      setUserData({});
      setAuthError(error.message);
      console.log(error);
    }
  };
  const signUp = async (login, password) => {
    try {
      await createUser({ variables: { login, password } });
      await signIn(login, password);
    } catch (error) {
      setIsAuthorized(false);
      setUserData({});
      setAuthError(error.message);
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsAuthorized(false);
    setToken(null);
    setUserData({});
    setAuthError(null);
  };
  const contextValue = React.useMemo(() => ({
    isAuthorized, userData, authError, loading, token, signIn, logout, signUp,
  }), [isAuthorized, userData, authError, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
