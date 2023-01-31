import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ApiList } from "../../models/ApiList";
import { ProductResponse } from "../../models/ProductResponse";
import { RootState } from "../../redux-toolkit/store";
import {
  fetchProducts,
  isApiListResponse,
} from "../../services/ProductService";
import { Product, ParamsUrlProduct, ProductsSlice } from "../../types/types";
import { APIError } from "./APIError";

const initialState: ProductsSlice = {
  list: [],
  activeModalProduct: null,
  paramsURL: {
    page: 1,
    perPage: 5,
    id: "",
  },
  total: 0,
  totalPages: 1,
  isLoading: false,
  error: { message: "", statusCode: undefined },
};

export const getProducts = createAsyncThunk<
  ApiList | ProductResponse,
  undefined,
  {
    state: RootState;
    rejectValue: APIError;
  }
>("products/getProductsPerPage", async (__, thunkAPI) => {
  let params = thunkAPI.getState().products.paramsURL;
  try {
    const response = await fetchProducts(params);
    await new Promise((r) => setTimeout(r, 1000));
    return response;
  } catch (err) {
    const error: AxiosError = err as any;
    if (!error.response) throw err;
    return thunkAPI.rejectWithValue(new APIError(error.code, error.message));
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePage(state, { payload }: PayloadAction<number>) {
      state.paramsURL.page = payload;
    },
    handleModal(state, { payload }: PayloadAction<Product | null>) {
      state.activeModalProduct = payload;
    },
    updateParamsUrl(state, { payload }: PayloadAction<ParamsUrlProduct>) {
      state.paramsURL = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = initialState.error;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (isApiListResponse(payload)) {
        state.list = [...payload.data];
        state.totalPages = payload.total_pages;
        state.total = payload.total;
        if (payload.page > payload.total_pages)
          state.paramsURL.page = payload.total_pages;
      } else {
        state.list = [payload.data];
        state.totalPages = 1;
      }
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.toJSON()!;
    });
  },
});

export const { changePage, handleModal, updateParamsUrl } =
  productsSlice.actions;
export default productsSlice.reducer;
