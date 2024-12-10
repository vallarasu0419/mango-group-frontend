import axios from "axios";
import Cookies from "universal-cookie";

export const BaseUrl = `http://localhost:3001`;

export const instance = axios.create({
  baseURL: BaseUrl,
});

export const cookie = new Cookies();

export const setToken = (token) => {
  instance.defaults.headers.common["x-auth-token"] = token;
};

const token = cookie.get("token");
console.log("--------", token);

if (token) {
  setToken(token);
}

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (!status) {
      console.error("Network or unexpected error occurred:", error);
      throw error;
    }

    switch (status) {
      case 401:
        cookie.remove("user");
        cookie.remove("token");
        setToken("");
        console.error("Unauthorized: Please log in again.");
        break;
      case 500:
        console.error("Server error occurred.");
        break;
      default:
        console.error(`Unhandled error: ${status}`);
    }

    throw error;
  }
);
