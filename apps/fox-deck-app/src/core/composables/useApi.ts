import axios from "axios";

export function useApi() {
  const apiUrl = "http://localhost:3000";

  const get = async (endpoint: string) => {
    return axios(`http://localhost:3000/${endpoint}`);
  };

  return {
    get: get,
  };
}
