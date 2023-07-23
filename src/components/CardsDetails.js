import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, REMOVE, INCREMENT, ERRORMESSAGE } from "../redux/actions/Action";
import "./Style.css";

const CardsDetails = () => {
  // State to hold the data and total price
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const history = useNavigate();

  // Retrieve cart data from Redux store
  const getdata = useSelector((state) => state.cartreducer.carts);

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      // Calculate the total price by multiplying each item's price with its quantity
      getdata.forEach((item) => {
        totalPrice = item.price * item.quantity + totalPrice;
      });
      setPrice(totalPrice);
    };

    calculateTotal();
  }, [getdata]);

  useEffect(() => {
    setData(getdata);
  }, [getdata]);

  // Function to increment quantity of an item
  const incrementQuantity = (item) => {
    // Check if the current quantity in the cart is greater than or equal to the item's quantity
    if (item.quantity >= item.qnty) {
      dispatch(ERRORMESSAGE("You have reached the maximum available quantity for this item"));
    } else {
      dispatch(INCREMENT(item));
    }
  };
  

  // Function to remove an item from the cart
  const removeItem = (item) => {
    dispatch(REMOVE(item));
  };

  // Function to delete the entire cart and navigate back to the main page
  const deleteCart = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const deleteCart1 = (id) => {
    dispatch(DLT(id));
  };

  // If the cart is empty, display "Cart is empty" message
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
                            : () => removeItem(item)
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
                    <h5 className="card-text" onClick={() => deleteCart1(item.id)}>
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
        style={{ width: "40%", marginTop: "20px" }}
      >
        <button type="button" className="btn btn-info" style={{ width: "40%" }}>
          Total Amount: ₹{price}
        </button>
      </div>
    </>
  );
};

export default CardsDetails;