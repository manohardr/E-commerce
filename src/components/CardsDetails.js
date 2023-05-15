import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {DLT, REMOVE, INCREMENT } from "../redux/actions/Action";

const CardsDetails = () => {
  const [data, setData] = useState([]);
  
  const dispatch = useDispatch();

  const { id } = useParams();

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  const send = (e) => {
    dispatch(INCREMENT(e));
  }
   
  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    compare();
    
  }, [id]);

  return (
    <>
      <div className="container mt-2">
    
        <h2 className="text-center ">Item Details Page</h2>
        <section className="mt-4">
          <div className="itemsdetails">
            {data.map((ele,index) => {
              return (
                <>
                  <div className="items_img">
                    <img className="mx-3" src={ele.imageURL} alt="" key={index}/>
                  </div>
                  <div className="details">
                    <table className="table table-borderless">
                      <tr className="d-flex flex-column mt-3" style={{display:"flex", gap:"20px 70px"}}>
                        <td>
                          <strong>Name  </strong>
                          {ele.name}
                        </td>
                        <td>
                          <strong>Color  </strong>
                          {ele.color}
                        </td>
                        <td>
                          <strong>Type  </strong>
                          {ele.type}
                        </td>
                        <td>
                          <strong>Price  </strong>₹ {ele.price}
                        </td>
                        <div
                          className="mt-5 d-flex justify-content-between align-items-center bg-secondary text-light"
                          style={{ width: 100, cursor: "pointer" }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={
                              ele.quantity <= 1
                                ? () => dlt(ele.id)
                                : () => remove(ele)
                            }
                          >
                            -
                          </span>
                          <span style={{ fontSize: 24 }}>{ele.quantity}</span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => send(ele)}
                          >
                            +
                          </span>
                        </div>
                        <td>
                          <strong>Total : </strong> ₹ {ele.price * ele.quantity}
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
