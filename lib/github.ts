import axios, { AxiosInstance } from "axios";

const github: AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "User-Agent": "r2d2-agent"
  }
});

export { github };
