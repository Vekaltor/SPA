/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ParamsUrlProduct, Product as TProduct } from "../../types/types";
import { getProducts, updateParamsUrl } from "./productsSlice";
import { paramsToString } from "../../services/ProductService";
import { productParams } from "../../constants/params";

import LazyLoadingProduct from "../../components/LazyLoadingProduct";
import Product from "./Product";
import ProductError from "./ProductError";
import PrototypeProduct from "../../components/PrototypeProduct";

import "./products.css";

type PropsProducts = {
  openModal: (product: TProduct) => void;
};

const Products = (props: PropsProducts) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const { openModal } = props;
  const dispatch = useAppDispatch();
  const { list, paramsURL, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const { page, perPage, id } = paramsURL;
  const [searchParams, setSearchParams] = useSearchParams();

  const renderLazyComponents = (): React.ReactElement[] => {
    let amountComponents: number = perPage;
    let components: React.ReactElement[] = [];
    for (let i = 1; i <= amountComponents; i++) {
      components.push(<LazyLoadingProduct key={i} />);
    }
    return components;
  };

  const renderListProducts = (): React.ReactElement[] => {
    return list.map((product, index) => (
      <Product key={index} product={product} click={openModal} />
    ));
  };

  const getParamsFromUrl = (): ParamsUrlProduct => {
    return {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : page,
      perPage: searchParams.get("per_page")
        ? Number(searchParams.get("per_page"))
        : perPage,
      id: searchParams.get("id") ? Number(searchParams.get("id")) : id,
    };
  };

  const checkParamsOnStart = (): void => {
    let newParams: ParamsUrlProduct = paramsURL;
    newParams = getParamsFromUrl();
    if (!isParamsEqual(newParams, paramsURL))
      dispatch(updateParamsUrl(newParams));
    setFirstLoad(false);
  };

  const isParamsEqual = (
    params1: ParamsUrlProduct,
    params2: ParamsUrlProduct
  ) => {
    return (
      params1.id === params2.id &&
      params1.page === params2.page &&
      params1.perPage === params2.perPage
    );
  };

  const handleGetProducts = () => {
    if (firstLoad) checkParamsOnStart();
    setSearchParams(createSearchParams(paramsToString(paramsURL)));
    dispatch(getProducts());
  };

  useEffect(() => {
    handleGetProducts();
  }, [paramsURL]);

  return (
    <>
      <PrototypeProduct />
      {error.message || error.statusCode ? (
        <ProductError {...error} />
      ) : isLoading ? (
        renderLazyComponents()
      ) : (
        renderListProducts()
      )}
    </>
  );
};

export default Products;
