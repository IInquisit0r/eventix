import { apiRequest } from "./client";

export const getEvents = async (page = 1) => {
  const data = await apiRequest(`/events?page=${page}`);

  return data.results || [];
};

export const getEventById = async (id) => {
  return apiRequest(`/events/${id}`);
};