import { Product, SupportApi } from "../types/types";

export type ApiList = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<Product>;
  support: SupportApi;
};
