import axios from "axios";

export function useApi() {
  const get = async (endpoint: string) => {
    return axios(`http://localhost:3000/${endpoint}`);
  };

  return {
    get: get,
  };
}
