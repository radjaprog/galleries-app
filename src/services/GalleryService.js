import axios from "axios";
import { httpService } from "./HttpService";

const handleError = (e) => {
  alert(e.response.data.message);
  // e['response']['data']['message']
  console.log(e.response.data);
};

class GalleryService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
  }

  async getAll(page = 1) {
    try {
      const { data } = await this.axiosInstance.get("galleries", {
        params: {
          page,
        },
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async getMyGalleries(page = 1) {
    try {
      const { data } = await this.axiosInstance.get(`my-galleries`, {
        params: {
          page,
        },
      });

      return data;
    } catch (e) {
      console.error("Error fetching galleries:", e);
      handleError(e);
    }
  }

  async get(id) {
    try {
      const { data } = await this.axiosInstance.get("galleries/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async add(newGallery) {
    try {
      const { data } = await this.axiosInstance.post(
        "galleries/create",
        newGallery
      );
      return data;
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        return e.response;
      }

      handleError(e);
    }
    return null;
  }

  async edit(gallery) {
    try {
      const { data } = await this.axiosInstance.put(
        "galleries/" + gallery.id,
        gallery
      );
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async delete(id) {
    try {
      const { data } = await this.axiosInstance.delete("galleries/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }
}

const galleryService = new GalleryService();

export default galleryService;
