import axios from "axios";

export class HttpService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
    });
  }
}

export const httpService = new HttpService();
