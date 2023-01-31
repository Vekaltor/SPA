import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ParamsUrlProduct, PropsSearchProduct } from "../../types/types";

import { BiSearchAlt2 } from "react-icons/bi";

const SearchProduct = (props: PropsSearchProduct) => {
  const [value, setValue] = useState("");
  const { regex, search, className } = props;
  const { perPage, id } = useAppSelector((state) => state.products.paramsURL);

  const handleChange = (event: ChangeEvent): void => {
    let input: HTMLInputElement = event.target as HTMLInputElement;
    let value: string = input.value;
    if (regex && !value.match(regex)) return;
    setValue(value);
  };

  const handleClick = (): void => {
    if (Number(value) === id || (!id && !value)) return;
    const params = modifyUrlParams(value);
    search(params);
  };

  const modifyUrlParams = (value: string): ParamsUrlProduct => {
    const id = isNotZero(value) ? Number(value) : "";
    const params: ParamsUrlProduct = {
      page: 1,
      perPage: perPage,
      id: id,
    };
    return params;
  };

  const isNotZero = (value: string) => {
    return Number(value) !== 0;
  };

  return (
    <div className="wrapper-search-product">
      <div className="search-product">
        <div className="outline">
          <input
            className={className}
            type="search"
            autoComplete="off"
            value={value}
            name="search-product"
            onChange={(e) => handleChange(e)}
          />
          <label>Search</label>
        </div>
        <button type="button" className="btn-search" onClick={handleClick}>
          <BiSearchAlt2 />
        </button>
      </div>
    </div>
  );
};

export default SearchProduct;
