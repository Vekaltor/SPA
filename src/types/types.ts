export type Product = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type SupportApi = {
  url: string;
  text: string;
};

export type PropsPagination = {
  direction: "previous" | "next";
};

export type PropsProduct = {
  product: Product;
  click: (product: Product) => void;
};

export type PropsWrapper = {
  className: string;
  children?: React.ReactNode;
};

export type PropsModal = {
  visible: boolean;
  cancel: VoidFunction;
  children: React.ReactElement;
};

export type PropsProductError = {
  error: ApiError;
};

export type ParamsUrlProduct = {
  page: number;
  perPage: number;
  id: number | "";
};

export type PropsSearchProduct = {
  search: (params: ParamsUrlProduct) => void;
  regex?: string;
  className: string;
};

export type ApiError = {
  message: string;
  statusCode: string | undefined;
};

export type ProductsSlice = {
  list: Array<Product>;
  activeModalProduct: Product | null;
  paramsURL: ParamsUrlProduct;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: ApiError;
};
