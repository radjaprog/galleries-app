import { httpService } from "./HttpService";

class AuthService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.setAxiosAuthorizationHeader();
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  setAxiosAuthorizationHeader(tokenParam = null) {
    let token = tokenParam ? tokenParam : localStorage.getItem("token");

    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }

  async register(data) {
    try {
      let response = await this.axiosInstance.post("/register", data);

      if (response.data) {
        localStorage.setItem("token", response.data.authorization.token);
        this.setAxiosAuthorizationHeader(response.data.authorization.token);
      }
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async login(credentials) {
    try {
      let response = await this.axiosInstance.post("/login", credentials);

      if (response.data) {
        localStorage.setItem("token", response.data.authorization.token);
        this.setAxiosAuthorizationHeader(response.data.authorization.token);
      }

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async logout() {
    let response = await httpService.axiosInstance.post("/logout");
    if (response.status === 200) {
      localStorage.removeItem("token");
      return response.data;
    }
  }

  async refresh() {
    try {
      const response = await this.axiosInstance.post("/refresh");
      if (response.data) {
        localStorage.setItem("token", response.data.authorization.token);
        this.setAxiosAuthorizationHeader(response.data.authorization.token);
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  }
}

export const authService = new AuthService();
