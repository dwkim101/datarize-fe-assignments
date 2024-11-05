import axios, { AxiosError } from "axios";

export type ClientError = AxiosError<{ error: string }>;

export const isClientError = (error: unknown): error is ClientError => {
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
