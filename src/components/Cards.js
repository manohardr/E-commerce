import React, { useEffect } from "react";
import { useState } from "react";
import "./Style.css";
import { useDispatch, useSelector} from "react-redux";
import { ADD } from "../redux/actions/Action";
import axios from "axios";
const Cards = () => {

  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
          setData(response.data);
          setSearchItem(response.data);
        } catch (error) {
          console.log("error available");
        }
      };
      fetchData();
    },[])
    
    const dispatch = useDispatch();
    
    
      const send = (e) => {
        
          return dispatch(ADD(e));
        }
        
     
   

 

  const searchFilter = (value) => {
   
    const search = data.filter(
      (f) =>
        f.name.toLowerCase().includes(value) ||
        f.color.toLowerCase().includes(value)
    );
    if(search.length == 0){
      setSearchItem(data);
    }else{
      setSearchItem(search);
    }
    }
   

 const sortingItem = (sort) => {
  const result = data.filter((curentData) => {
    if(curentData.gender === sort){
    return curentData.gender;
    }else if(curentData.gender === sort){
      return curentData.gender;
    }else if(curentData.type === sort){
      return curentData.type;
    }else if(curentData.type === sort){
      return curentData.type;
    }else if(curentData.type === sort){
      return curentData.type;
    }else{
      for( let i = 0; i<sort.length; i++){
        if(curentData.price === sort[i]){
          return curentData.price;
        }
      }
    }
    
  })
  setSearchItem(result);
 }


     
  return (
    <>
    <div className="container p-5">
      <div className="mt-5 d-flex flex-row justify-content-center align-items-center">
        
        <div
          className="w-50 border border-info d-flex flex-row justify-content-center align-items-center"
          style={{ borderRadius: "5px" }}
        >
          <i className="fa fa-search m-2"></i>
          <input
            type="text"
            className="form-control border-0"
            id="exampleFormControlInput1"
            placeholder=" Search for products"
            onChange={(event) => {
              searchFilter(event.target.value);
            }}
          />
          </div>
        
        <div className="btn-group dropend">
          <button type="button" className="btn btn-info dropdown-toggle mx-2" data-bs-toggle="dropdown"  aria-expanded="false">
           Sort by
          </button>
          <ul className="dropdown-menu" style={{width:"250px"}}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem('Men')}>Men</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem('Women')}>Women</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem('Polo')}>Type Polo</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem('Hoodie')}>Type Hoodie</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem('Basic')}>Type Basic</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem([250,300,350])}>₹250 - ₹350</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>sortingItem([350, 500])}>₹350 - ₹500</button>
              <button className="btn btn-warning w-50 m-2" onClick={()=>setSearchItem(data)}>All</button>
              </div>
  </ul>
</div>

      </div>

      
          
            <div className="row mx-4">
            {
           searchItem.map((item, id) => {

                  return (
                    <>
                    <div className="col-md-4 mb-3" key={id}>
                      <div
                        className="card mx-2 mt-4 card_style"
                        
                        style={{ width: "300px", border: "none" }}
                      >
                        <img
                          src={item.imageURL}
                          className="card-img-top m-2"
                          alt="..."
                          style={{ height: "12rem" }}
                        />
                        <div
                          className="card-body"
                          style={{ alignItems: "center" }}
                        >
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text"><strong>Price :</strong> ₹ {item.price}</p>

                          <div className="button_div d-flex justify-content-center">
                            <button
                              className="btn btn-primary col-lg-12"
                              onClick={() => send(item)}
                            >
                              Add to Card
                            </button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </>
                  );
                })}
              
                
              </div>
            </div>
          
        
     
    </>
  );
};


export default Cards;
