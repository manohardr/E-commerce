import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DLT } from "../redux/actions/Action";
const Header = () => {
  
  const [price, setPrice] = useState(0);

  const getdata = useSelector((state)=> state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id))
  }

  const total = () =>{
    let price = 0;
    getdata.map((ele,k)=>{
      price = ele.price * ele.qnty + price
    })
    setPrice(price);
  }

 

  useEffect(()=>{
    total();
  },[total])
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-dark"
        style={{ height: 60 , width:"100vw"}}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Add to card
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Link
              className="nav-link active text-light"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="dropdown">
            <Link
              className="fa-solid fa-cart-shopping text-light position-relative"
              style={{ fontSize: 25, cursor: "pointer" }}
              to="/"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: 10 }}
              >
                {getdata.length}
              </span>
            </Link>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/"></Link>
                {
                  getdata.length ?
                  <div className="card_details" style={{width:"24rem", padding:10}}>
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Restaurant Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          getdata.map((e)=> {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <NavLink to={`/cart/${e.id}`}>
                                    <img src={e.imgdata} style={{width:"6rem", height:"6rem", margin:"10px"}} alt=""/>
                                    </NavLink>
                                  </td>
                                  <td>
                                    <p>{e.rname}</p>
                                    <p>Price : ₹{e.price}</p>
                                    <p>Quantity : {e.qnty}</p>
                                    <p style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                      <i className="fas fa-trash smalltrash"></i>
                                    </p>
                                  </td>
                                  <td className="mt-5" style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                    <i className="fas fa-trash largetrash"></i>
                                  </td>
                                </tr>
                              
                              </>
                            )
                          })
                        }
                        <p className="text-center">Total : ₹ {price}</p>
                      </tbody>
                    </table>
                  </div> :
                  
                  <div className="card_details d-flex justify-content-center align-items-center" style={{padding:"10px"}}>
                  <i className="fas fa-close" style={{position:"absolute", top:2, right:20, fontSize:23, cursor:"pointer"}}></i>
                  <p>Your cart is empty</p>
                  <img src="./cart.gif" alt="" style={{width:"50px"}}/>
                </div>
             
                }
                 </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
