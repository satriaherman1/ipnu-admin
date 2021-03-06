declare interface IMember {
  name: string;
  status: string;
  age: number;
  address: string;
  type: string;
}

declare interface Data {
  name: string;
  age: Number;
  status: string;
  address: string;
  action?: any;
  _id: string;
}

declare interface IArticleData {
  title: string;
  content: string;
  imageId: string;
  author: string;
  category?: IArticleCategoriesData[];
  _id?: string;
}
declare interface IArticleCategoriesData {
  name: string;
  _id?: string;
}

declare interface ILocalData {
  store: any;
  dispatch: any;
}

declare interface IBreadCrumbsData {
  previousPage: string[];
  currentPage: string;
}
