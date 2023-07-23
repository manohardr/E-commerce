import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD,
  FETCHPRODUCTS,
  SEARCHPRODUCTS,
  ERRORMESSAGE,
} from "../redux/actions/Action";
import Filter from "./Filter";

const Cards = () => {
  const [filterData, setFilterData] = useState([]);
  const [count, setCount] = useState({});
  const [prevItem, setPrevItem] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
        );
        dispatch(FETCHPRODUCTS(response.data));
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const filterInput = useSelector((state) => state.cartreducer.products);

  useEffect(() => {
    setFilterData(filterInput);
  }, [filterInput]);

  const send = (e) => {
    // Check if the previous item exists and its ID is the same as the current item's ID
    if (prevItem && prevItem.id === e.id) {
      // Check if the count of the current item has reached its quantity limit
      if (count[e.id] >= e.quantity) {
        dispatch(
          ERRORMESSAGE(
            "You have reached the maximum available quantity for this item"
          )
        );
        return; // Exit the function early to avoid dispatching the "ADD" action
      }

      // Increment the count of the current item
      setCount((prevCount) => ({ ...prevCount, [e.id]: prevCount[e.id] + 1 }));
    } else {
      // If the previous item is different or doesn't exist, set the count of the current item to 1
      setCount((prevCount) => ({ ...prevCount, [e.id]: 1 }));
    }

    // Dispatch the "ADD" action to add the item to the cart
    dispatch(ADD(e));

    // Update the prevItem state with the current item
    setPrevItem(e);
  };

  const searchFilter = (value) => {
    dispatch(SEARCHPRODUCTS(value));
  };

  return (
    <>
      <div className="container p-5">
        <div className="mt-5 mb-5 d-flex flex-row justify-content-center align-items-center">
          <div
            className="border border-info d-flex flex-row justify-content-center align-items-center"
            style={{ borderRadius: "5px", width: "500px" }}
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
          <div>
            <Filter />
          </div>
        </div>

        <div className="row mx-4 ">
          {filterData.length > 0 ? (
            filterData.map((item) => (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card card_style mx-2 mt-1 p-2">
                  <img
                    src={item.imageURL}
                    className="card-img-top m-2"
                    alt="..."
                    style={{ height: "12rem" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      <strong>Price:</strong> ₹ {item.price}
                    </p>
                    {item.quantity > 0 ? (
                      <div className="button_div d-flex justify-content-center">
                        <button
                          className="btn btn-primary col-lg-12"
                          onClick={() => send(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button className="text-center btn btn-danger col-lg-12">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <div className="text-center">
                <h2>No products found</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cards;
