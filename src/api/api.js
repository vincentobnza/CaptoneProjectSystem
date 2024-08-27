import axios from "axios";
import { API_BASE_URL, API_KEY } from "./constants";

export const api = {
  POST: {
    method: axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      withCredentials: true,
      timeout: 30000,
    }),
  },
  GET: {
    method: axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 30000,
    }),
  },
};
