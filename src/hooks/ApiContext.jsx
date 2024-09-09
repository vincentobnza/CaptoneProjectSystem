import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [youtubeData, setYoutubeData] = useState([]);

  const fetchYoutubeVideoURL = async () => {
    try {
      const url = import.meta.env.VITE_YOUTUBE_VIDEO_API;
      const response = await axios.get(url);
      const { data } = response;
      setYoutubeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYoutubeVideoURL();
  }, []);

  const value = {
    youtubeData,
    fetchYoutubeVideoURL,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
