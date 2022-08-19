import { createContext, useReducer } from 'react';
import { createRenderer } from 'react-dom/test-utils';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    repos: [],
    users: [],
    user: {},
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  //Get user repos

  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  //Get a single user

  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  //Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
