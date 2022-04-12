import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../../config/environtment";
import { headers } from "./base-request.service";
export class ArticleRestService {
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
  getArticles() {
    return this.http.get(`/post/article`);
  }
  getArticleById(id: any) {
    return this.http.get(`/post/article/${id}`);
  }
  createArticle(params: IArticleData) {
    return this.http.post(`/post/article`, params);
  }
  deleteArticleById(id: any) {
    return this.http.delete(`/post/article/${id}`);
  }
  updateArticle(id: any, params: any) {
    return this.http.put(`/post/article/${id}`, params);
  }
  getMemberByKey(params: any) {
    return this.http.get(`/post/article/key`, {
      params: params,
    });
  }

  uploadArticleImage(file: any) {
    let formData = new FormData();
    const type = file[0].type;
    const blob = new Blob(file, { type: type });

    formData.append("file", blob);
    return this.httpUpload.post("/post/article/upload", formData);
  }
}
