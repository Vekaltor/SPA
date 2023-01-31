import { CSSProperties } from "react";
import { PropsProduct } from "../../types/types";

const Product = (props: PropsProduct) => {
  const { product, click } = props;

  const globalStyle = { "--color": product.color } as CSSProperties;

  const handleClick = (): void => {
    click(product);
  };

  return (
    <div className="product-in-list" style={globalStyle} onClick={handleClick}>
      <span className="id">{product.id}</span>
      <span className="name">
        <div className="color"></div>
        {product.name}
      </span>
      <span className="year">{product.year}</span>
    </div>
  );
};

export default Product;
