import { createContext } from "react";
import axios from 'axios'

// const BASE_URL = "https://churchhive.net/api/church/";
const BASE_URL = "http://localhost:3001/api/church/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const ChurchContext = createContext()

export const ChurchProvider = (props) => {

  const searchChurches = async (query) => {
    if (query === "") {
      return
    }
    const searchChurchUrl = `${BASE_URL}search/${query}`
    try {
      const response = await axios.get(searchChurchUrl);
      return response.data
    } catch (error) {
      return false
    }
  };

  const getChurch = async (churchId) => {
    const churchIdURL = `${BASE_URL}${churchId}`;
    try {
      const response = await axios.get(churchIdURL);
      return await response.data;
    } catch (error) {
      throw error.response.statusText;
    }
  };

  const updateChurch = async (updatedChurch) => {
    const churchIdURL = `${BASE_URL}${updatedChurch.churchId}`;
    try {
      const response = await axios.put(churchIdURL, updatedChurch, {
        headers: authHeader(),
      });
      return await response.data;
    } catch (error) {
      throw error.response.statusText;
    }
  };

  return (
    <ChurchContext.Provider
      value={{
        searchChurches,
        getChurch,
        updateChurch
      }}
    >
      {props.children}
    </ChurchContext.Provider>
  )
}