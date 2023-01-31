import { Product, SupportApi } from "../types/types";

export type ProductResponse = {
  data: Product;
  support: SupportApi;
};
