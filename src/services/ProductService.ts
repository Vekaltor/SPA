import { ApiList } from "../models/ApiList";
import { ProductResponse } from "../models/ProductResponse";
import { ParamsUrlProduct } from "../types/types";
import apiRequest from "../utils/apiRequest";

export async function fetchProducts(
  params: ParamsUrlProduct
): Promise<ApiList | ProductResponse> {
  const { page, perPage, id = "" } = params;
  const { data }: ApiList | ProductResponse | any = await apiRequest.get<
    ApiList | ProductResponse
  >(`products`, {
    params: {
      per_page: perPage,
      page: page,
      id: id,
    },
  });
  return data;
}

export function paramsToString(params: ParamsUrlProduct) {
  return {
    page: String(params.page),
    id: String(params.id),
  };
}

export function isApiListResponse(response: any): response is ApiList {
  return response && response.total_pages;
}
