import { createContext } from "react";
import axios from 'axios'

// const BASE_URL = "https://churchhive.net/api/user/";
const BASE_URL = "http://localhost:3001/api/user/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const ChurchUserContext = createContext()

export const ChurchUserProvider = (props) => {

  const loginChurchUser = async (churchUser) => {
    const loginUserURL = `${BASE_URL}signin`;
    try {
      const response = await axios.post(loginUserURL, churchUser);
      if (response.status === 200) {
        localStorage.setItem("myChurchUserToken", response.data.token);
        return response.data;
      }
    } catch (error) {
      return error
    }
  };

  const createChurchUser = async (newUser) => {
    const newUserURL = `${BASE_URL}create-account`;
    try {
      const response = await axios.post(newUserURL, newUser, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const searchUsers = async (query) => {
    if (!query) {
      return
    }
    const queryUrl = `${BASE_URL}search/${query}`;
    try {
      const response = await axios.post(queryUrl, query, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id) => {
    const queryUrl = `${BASE_URL}${id}`;
    try {
      const response = await axios.get(queryUrl, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const updateUser = async (user) => {
    const url = `${BASE_URL}edit-account/${user.userId}`;
    try {
      const response = await axios.put(url, user, {
        headers: authHeader(),
      });
      return response.data
    } catch (error) {
      throw error;
    }
  }
  
  const deleteUser = async (userId) => {
    const url = `${BASE_URL}delete-account/${userId}`;
    try {
      const response = await axios.delete(url, {
        headers: authHeader(),
      });
      return response.data
    } catch (error) {
      throw error;
    }
  }

  return (
    <ChurchUserContext.Provider
      value={{
        loginChurchUser,
        createChurchUser,
        searchUsers,
        getUser,
        updateUser,
        deleteUser
      }}
    >
      {props.children}
    </ChurchUserContext.Provider>
  )
}