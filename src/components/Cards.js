import React from "react";
import  {useState} from 'react';
import Cardsdata from "./CardsData";
import "./Style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/Action";
const Cards = () => {

  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const send = (e) => {
    //console.log(e);
    dispatch(ADD(e));
    
  }

  return (
    <>
     <div className="container mt-3">
        <div className="row d-flex justify-content-center align-items-center">
    {
      Object.values(data).map((item, id) => {
        return (
          <>
        
        
          <div className="card mx-2 mt-4 card_style" style={{ width: "350px", border:"none"}}>
            <img src={item.imgdata} className="card-img-top mt-3" alt="..." style={{height:"15rem"}} />
            <div className="card-body" style={{alignItems:"center"}}>
              <h5 className="card-title">{item.rname}</h5>
              <p className="card-text">Price : ₹ {item.price}</p>
              
              <div className="button_div d-flex justify-content-center">
              <button className="btn btn-primary col-lg-12" onClick={()=> send(item)}>
                Add to Card
              </button>
              </div>
            </div>
          </div>
          </>
        )
      
      })
    }
       </div>

      </div> 


    </>
  );
};

export default Cards;






