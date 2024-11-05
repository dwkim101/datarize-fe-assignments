import axios, { AxiosError } from "axios";

export const isClientError = (error: unknown): error is AxiosError<{ error: string }> => {
  return error instanceof AxiosError;
};

const client = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default client;
