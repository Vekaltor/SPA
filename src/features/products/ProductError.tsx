import { ApiError } from "../../types/types";

const ProductError = (error: ApiError) => {
  const { message, statusCode } = error;
  return (
    <div className="error-product">
      <span>{statusCode}</span>
      <span> {message}</span>
    </div>
  );
};

export default ProductError;
