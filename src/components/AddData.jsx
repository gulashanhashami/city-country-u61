
 import axios from "axios";
 import { useState } from "react";
 import styled from "styled-components";
import { Link } from "react-router-dom";
  const ResultDiv1 = styled.div`
   .formdata1{
       width: 53%;
       height: auto;
       margin: auto;

       
   }
   input{
       width: 40%;
       height: 2.5vh;
   }
   #btn{
       width: 24%;
       height: 3.5vh;
   }
   p{
       font-weight: bold;
       margin-right: 29%;
   }
  `;
export const AddData=()=>{
    const [formdata, setformData] =useState({});


    const handleChange=(e)=>{
        const key=e.target.name;
       
    setformData({
        ...formdata,
        [key]:e.target.value,
    });
   }
         return (
             <ResultDiv1>
                 <Link to={"/"}>Go to home</Link>
           <div className="formdata1">
             
             <form onSubmit={(e)=>{
              e.preventDefault();
              axios.post("http://localhost:3001/data", formdata).then(()=>{
                  setformData({
                      country: "",
                      city: "",
                      population:"",
                  })
              })
          }}>
            <p>Enter coutry</p>
            <input type="text" name="country" value={formdata.country} placeholder="Country" onChange={handleChange} />
            <p>Enter city</p>
            <input type="text" name="city" value={formdata.city}  placeholder="City" onChange={handleChange} />
            <p>population</p>
            <input type="number" name="population" value={formdata.population} placeholder="Population" onChange={handleChange} />
            <br />
            <br />
            <input id="btn" type="submit" value="Submit" />
            </form>      
        </div>
        </ResultDiv1>
    )
}