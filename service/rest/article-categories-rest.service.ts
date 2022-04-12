import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../../config/environtment";
import { headers } from "./base-request.service";
export class ArticleCategoryRestService {
  private http: AxiosInstance;
  private httpUpload: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        ...headers,
      },
    });
    this.httpUpload = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
  }
  getCategories() {
    return this.http.get(`/post/categories`);
  }
  getCategoriesById(id: any) {
    return this.http.get(`/post/categories/${id}`);
  }
  createCategories(params: IArticleCategoriesData) {
    return this.http.post(`/post/categories`, params);
  }
  deleteCategoriesById(id: any) {
    return this.http.delete(`/post/categories/${id}`);
  }
  updateCategories(id: any, params: any) {
    return this.http.put(`/post/categories/${id}`, params);
  }
}
