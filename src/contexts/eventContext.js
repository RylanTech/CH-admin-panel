import { createContext } from "react";
import axios from 'axios'

// const BASE_URL = "https://churchhive.net/api/event/";
const BASE_URL = "http://localhost:3001/api/event/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const EventContext = createContext()

export const EventProvider = (props) => {

    const getEvent = async (eventId) => {
        const eventIdURL = `${BASE_URL}${eventId}`;
        try {
          const response = await axios.get(eventIdURL);
          return await response.data;
        } catch (error) {
          throw error.response.statusText;
        }
      };

      const searchEvents = async (query) => {
        if (query === "") {
          return
        }
        const searchEventsUrl = `${BASE_URL}search/${query}`
        try {
          const response = await axios.get(searchEventsUrl);
          return response.data
        } catch (error) {
          return false
        }
      };

      const updateEvent = async (updatedEvent) => {
        console.log(updatedEvent)
        const eventIdURL = `${BASE_URL}editevent/${updatedEvent.eventId}`;
        try {
          const response = await axios.put(eventIdURL, updatedEvent, {
            headers: authHeader(),
          });
          return response.data;
        } catch (error) {
          throw error.response.statusText;
        }
      };

    return (
        <EventContext.Provider
            value={{
                getEvent,
                searchEvents,
                updateEvent
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}