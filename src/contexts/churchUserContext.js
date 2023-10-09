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

  return (
    <ChurchUserContext.Provider
      value={{
        loginChurchUser,
        createChurchUser
      }}
    >
      {props.children}
    </ChurchUserContext.Provider>
  )
}