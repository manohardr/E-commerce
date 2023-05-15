import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DLT } from "../redux/actions/Action";
import "./Style.css";
const Header = () => {
  const [price, setPrice] = useState(0);

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele) => {
      price = ele.price * ele.quantity + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-dark"
        style={{ height: 60, width: "100vw", position:"fixed",margin:"0" }}
      >
        <div className="container">
          <h5 className="text-white">TeeRex Store</h5>
          <div className="dropdown">
          <Link className="navbar-brand mx-5" to="/">
           Products
          </Link>
            <Link
              className="fa-solid fa-cart-shopping text-light position-relative"
              style={{ fontSize: 25, cursor: "pointer" }}
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                style={{ fontSize: 10 }}
              >
                {getdata.length}
              </span>
            </Link>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                {getdata.length ? (
                  <div
                    className="card_details"
                    style={{ width: "24rem", padding: 10 }}
                  >
                    <table className="table table-sm">
                      <thead>
                        <tr className="text-nowrap bg-border">
                          <th>Photo</th>
                          <th>Restaurant Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.map((e) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <NavLink to={`/cart/${e.id}`}>
                                    <img
                                      src={e.imageURL}
                                      style={{
                                        width: "6rem",
                                        height: "6rem",
                                        margin: "10px",
                                      }}
                                      alt=""
                                    />
                                  </NavLink>
                                </td>
                                <td>
                                  <p><strong>Name :</strong> {e.name}</p>
                                  <p><strong>Price :</strong> ₹{e.price}</p>
                                  <p><strong>Quantity :</strong> {e.quantity}</p>
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: 20,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => dlt(e.id)}
                                  >
                                    <i className="fas fa-trash smalltrash"></i>
                                  </p>
                                  <td className="bg-light">
                                  <NavLink to={`/cart/${e.id}`}>
                                    Details
                                    </NavLink>
                                  </td>
                                </td>
                                
                                <td
                                  className="m-5"
                                  style={{
                                    color: "red",
                                    fontSize: 20,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => dlt(e.id)}
                                >
                                  <i className="fas fa-trash largetrash m-4"></i>
                                
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                        <td className="text-center mt-1"><strong>Total :</strong> ₹{price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    className="card_details d-flex justify-content-center align-items-center mt-2"
                    style={{ padding: "10px"}}
                  >
                    <i
                      className="fas fa-close"
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 20,
                        fontSize: 23,
                        cursor: "pointer",
                      }}
                    ></i>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="text-primary mb-0"><strong>Your cart is empty</strong></p>
                    <img src="./cart.gif" alt="" style={{ width: "50px" }} />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
