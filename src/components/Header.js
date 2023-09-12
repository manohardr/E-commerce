import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const getData = useSelector((state) => state.cartreducer.carts);

  return (
    <>
      <nav className="container-fluid navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h5 className="text-info storeName">TeeRex Store</h5>
          <div className="dropdown">
            <Link className="navbar-brand mx-auto text-white" to="/">
              Products
            </Link>
            {getData.length} ? (
            <Link
              to="/cart"
              className="fa-solid fa-cart-shopping text-light position-relative"
              role="button"
            >
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                style={{ fontSize: "0.625rem" }}
              >
                {getData.length}
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
