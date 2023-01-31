/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { ParamsUrlProduct, Product as TProduct } from "../../types/types";
import { handleModal, updateParamsUrl } from "./productsSlice";

import Pagination from "../pagination/Pagination";
import SearchProduct from "../search-product/SearchProduct";
import Header from "../header-about-page/Header";
import Wrapper from "../../components/Wrapper";
import Modal from "../../components/Modal";
import ModalProduct from "../modal-product/ModalProduct";
import Products from "./Products";

import "./products.css";

const ListOfProducts = () => {
  const [modalVisble, setModalVisble] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenModal = (product: TProduct): void => {
    dispatch(handleModal(product));
    setModalVisble(true);
  };

  const handleCloseModal = (): void => {
    dispatch(handleModal(null));
    setModalVisble(false);
  };

  const handleSearch = (params: ParamsUrlProduct): void => {
    dispatch(updateParamsUrl(params));
  };

  return (
    <div className="container">
      <Header />
      <SearchProduct
        className="search-input"
        regex="^[0-9]*$"
        search={handleSearch}
      />
      <Wrapper className="list-of-products">
        <Products openModal={handleOpenModal} />
        <Modal visible={modalVisble} cancel={handleCloseModal}>
          <ModalProduct />
        </Modal>
      </Wrapper>
      <Wrapper className="paginations">
        <Pagination direction="previous" />
        <Pagination direction="next" />
      </Wrapper>
    </div>
  );
};

export default ListOfProducts;
