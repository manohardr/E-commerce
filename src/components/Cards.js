import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD, FETCHPRODUCTS } from "../redux/actions/Action";
import Filter from "./Filter";
import SearchProduct from "./SearchProduct";

const Cards = () => {

  const filterData = useSelector((state) => state.cartreducer.products);
  
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

  //Function to send data to Cart
   const send = (e) => {
    dispatch(ADD(e));
   };

  return (
    <>
      <div className="container pt-5">
        <div className="mt-5 mb-5 d-flex flex-row justify-content-center align-items-center">
          <div style={{ width: "50%", marginRight: "15PX" }}>
            <SearchProduct />
          </div>
          <div>
            <Filter />
          </div>
        </div>

        <div className="row">
          {filterData === null ? (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : filterData.length > 0 ? (
            filterData.map((item) => (
              <div
                className="col-lg-3 col-md-4 coll
               mb-3"
                key={item.id}
              >
                <div className="card card_style mx-2 mt-1 p-2">
                  <img
                    src={item.imageURL}
                    className="card-img-top img-fluid m-2"
                    alt="..."
                    style={{ maxHeight: "8rem", width: "100%" }}
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
