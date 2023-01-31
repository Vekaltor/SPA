import { useAppSelector } from "../../hooks/hooks";

const Header = () => {
  const { paramsURL, totalPages, error } = useAppSelector(
    (state) => state.products
  );

  let currentPage: number | string = paramsURL.page;
  let lastPage: number | string = totalPages;

  if (error.message || error.statusCode) lastPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  return (
    <div className="number-page">
      page&nbsp;
      <span>
        ( {currentPage} of {lastPage} )
      </span>
    </div>
  );
};

export default Header;
