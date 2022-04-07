import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../../config/environtment";

export class ArticleRestService {
  private http: AxiosInstance;
  private httpUpload: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: baseUrl,
    });
    this.httpUpload = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async getArticles() {
    try {
      return await this.http.get(`/post/article`);
    } catch (err) {
      console.log(err);
    }
  }
  async createArticle(params: IArticleData) {
    try {
      return await this.http.post(`/post/article`, params);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteArticleById(id: any) {
    try {
      return await this.http.delete(`/post/article/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  async getMemberByKey(params: any) {
    try {
      return await this.http.get(`/post/article/key`, {
        params: params,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async uploadArticleImage(file: any) {
    let formData = new FormData();
    const type = file[0].type;
    const blob = new Blob(file, { type: type });

    formData.append("file", blob);
    return await this.httpUpload.post("/post/article/upload", formData);
  }
}
