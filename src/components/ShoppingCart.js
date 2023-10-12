import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, REMOVE, INCREMENT} from "../redux/actions/Action";
import "./Style.css";

const ShoppingCart = () => {
  // State is to hold the data and total price
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const history = useNavigate();

  // Get cart data from Redux store
  const getData = useSelector((state) => state.cartreducer.carts);

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      // Calculate the total price by multiplying each item's price with its quantity
      getData.forEach((item) => {
        totalPrice = item.price * item.quantity + totalPrice;
      });
      setPrice(totalPrice);
    };

    calculateTotal();
  }, [getData]);

  useEffect(() => {
    setData(getData);
  }, [getData]);

  // Function is for incrementing the quantity of item
  const incrementQuantity = (item) => {
    dispatch(INCREMENT(item));
  };

  // Function is for decrementing the quantity of item
  const decrementQuantity = (item) => {
    dispatch(REMOVE(item));
  };

  // Function is for deleting the entire cart and navigating back to the products page
  const deleteCart = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  // Function is for deleting card
  const deleteCard = (id) => {
    dispatch(DLT(id));
  };
  
  if (data.length === 0) {
    return (
      <div className="container" style={{ marginTop: "80px" }}>
        <h5 className="text-success">Shopping Cart</h5>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 160px)" }}
        >
          <h2 className="text-success">Cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{ marginTop: "80px" }}>
        <h5 className="text-success">Shopping Cart</h5>
      </div>
      <div
        className="container shadow pt-2 pb-2 d-flex justify-content-center align-items-center card g-2"
        style={{
          marginTop: "30px",
          width: "40%",
          height: "30%",
          backgroundColor: "#d7e7f7",
        }}
      >
        <div className="row g-2 m-3">
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className="col-md-4 rounded mb-4"
                  style={{ backgroundColor: "white" }}
                >
                  <img
                    src={item.imageURL}
                    className="img-fluid rounded p-2"
                    alt="..."
                  />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body d-flex align-items-center justify-content-center flex-column">
                    <h5 className="card-title mb-3">{item.name}</h5>
                    <h5 className="card-title mb-3">Rs. {item.price}</h5>
                    <div
                      className="btn-group mb-3"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={
                          item.quantity <= 1
                            ? () => deleteCart(item.id)
                            : () => decrementQuantity(item)
                        }
                      >
                        -
                      </button>
                      <button type="button" className="btn btn-warning">
                        {item.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => incrementQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    <h5
                      className="card-text"
                      onClick={() => deleteCard(item.id)}
                    >
                      <i className="fas fa-trash largetrash mb-3"></i>
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div
        className="container h5 card-footer bg-transparent border-light text-center"
        style={{ width: "60%", marginTop: "20px" }}
      >
        <button type="button" className="btn btn-info" style={{ width: "40%" }}>
          Total Amount: ₹{price}
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
