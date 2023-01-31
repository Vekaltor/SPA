import { useAppSelector } from "../../hooks/hooks";

const ModalProduct = () => {
  const { activeModalProduct } = useAppSelector((state) => state.products);
  return (
    <div className="modal-product">
      <span className="id">
        <span>id:</span>
        <span>{activeModalProduct?.id}</span>
      </span>
      <span className="name">
        <span>name:</span>
        <span>{activeModalProduct?.name}</span>
      </span>
      <span className="year">
        <span>year:</span>
        <span>{activeModalProduct?.year}</span>
      </span>
      <span className="color">
        <span>color:</span>
        <span>{activeModalProduct?.color}</span>
      </span>
      <span className="pantone-value">
        <span>pantone value:</span>
        <span>{activeModalProduct?.pantone_value}</span>
      </span>
    </div>
  );
};

export default ModalProduct;
