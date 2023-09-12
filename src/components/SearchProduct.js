import { useDispatch } from "react-redux";
import "./Style.css";
import { SEARCHPRODUCTS } from "../redux/actions/Action";
const SearchProduct = () => {
  const dispatch = useDispatch();

  const searchFilter = (value) => {
    dispatch(SEARCHPRODUCTS(value));
  };
  return (
    <>
      <div
        className="border border-info d-flex flex-row justify-content-center align-items-center"
        style={{ borderRadius: "5px", Width: "500px" }}
      >
        <i className="fa fa-search m-2"></i>
        <input
          type="text"
          className="form-control border-0"
          id="exampleFormControlInput1"
          placeholder="Find products by name, color, type"
          onChange={(event) => searchFilter(event.target.value)}
        />
      </div>
    </>
  );
};

export default SearchProduct;
