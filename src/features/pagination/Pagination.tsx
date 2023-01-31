import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { PropsPagination } from "../../types/types";
import { changePage } from "../products/productsSlice";

const Pagination = (props: PropsPagination) => {
  const { direction } = props;
  const { paramsURL, totalPages, isLoading } = useAppSelector(
    (state) => state.products
  );
  const { page } = paramsURL;
  const dispatch = useAppDispatch();

  const checkValuePage = (newPage: number): boolean => {
    return newPage <= totalPages && newPage > 0;
  };

  const handleClick = (): void => {
    let newPage = page;
    if (direction === "next") newPage++;
    else newPage--;
    if (checkValuePage(newPage)) dispatch(changePage(newPage));
  };

  const className =
    direction === "previous" && page === 1
      ? "btn disable"
      : direction === "next" && page === totalPages
      ? "btn disable"
      : "btn";

  return (
    <div className={`pagination ${direction}`}>
      <button className={className} onClick={handleClick} disabled={isLoading}>
        {direction}
      </button>
    </div>
  );
};

export default Pagination;
