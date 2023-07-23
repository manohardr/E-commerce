import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const getdata = useSelector((state) => state.cartreducer.carts);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h5 className="text-white">TeeRex Store</h5>
          <div className="dropdown">
            <Link className="navbar-brand mx-5 text-white" to="/">
              Products
            </Link>
            {getdata.length} ? (
            <Link
              to="/cart"
              className="fa-solid fa-cart-shopping text-light position-relative"
              role="button"
            >
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                style={{ fontSize: "0.625rem" }}
              >
                {getdata.length}
              </span>
            </Link>
            )
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
