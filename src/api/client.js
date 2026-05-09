const BASE_URL = "http://localhost:3001/api";

export const apiRequest = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};