const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:3001/api"
    : "https://eventix-mrv6.onrender.com/api";

export const apiRequest = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};