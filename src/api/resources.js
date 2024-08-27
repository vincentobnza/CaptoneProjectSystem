import api from "./api";

export const getResources = async () => {
  try {
    const response = await api.get(END_POINTS.RESOURCES);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
