import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, DLT, REMOVE } from "../redux/actions/Action";
const CardsDetails = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const dispatch = useDispatch();

  const { id } = useParams();

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  const send = (e)=>{
    dispatch(ADD(e));
  }

  const dlt = (id)=>{
        dispatch(DLT(id));
        history('/');
    }

  const remove = (item) => {
    dispatch(REMOVE(item))
  }

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">items Details Page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img
                      className="mx-3"
                      src={ele.imgdata}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <table class="table table-borderless">
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant : </strong>{ele.rname}
                          </p>
                          <p>
                            <strong>Price : </strong>₹ {ele.price}
                          </p>
                          <p>
                            <strong>Dishes : </strong>{ele.address}
                          </p>
                          <p>
                            <strong>Total : </strong> ₹ {ele.price*ele.qnty}
                          </p>
                          <div className="mt-5 d-flex justify-content-between align-items-center bg-secondary text-light" style={{width:100, cursor:"pointer"}}>
                            <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele):()=>remove(ele)}>-</span>
                            <span style={{fontSize:24}}>{ele.qnty}</span>
                            <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>

                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong> 
                            <span
                              style={{ background: "green", color: "white" }}
                            >
                              {ele.rating}★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            <span>{ele.somedata}</span>
                          </p>
                          
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
