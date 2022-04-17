
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {
    getDataLoading,
    getDataSuccess,
  } from "../redux/actions";
  import axios from "axios";

  import styled from "styled-components";

  const ResultDiv = styled.div`
 
  .box2:hover{
    background-color: whitesmoke;
    color: black;
    font-weight: bold;
  }
  
  table{
      margin: auto;
  }
  th, td{
    padding: 10px;
    border: 1px solid grey;
}
th{
    font-weight: bold;
    border: 2px solid grey;
}

  a{
    text-decoration: none;
    color:white;
  }
  #btn1{
    color:white;
    background-color: blue;
    border:2px solid blue;
   
  }
  #btn2{
    color:white;
    background-color: green;
    border:2px solid green;
   
  }
  #btn3{
    color:white;
    background-color: red;
    border:2px solid red;
   
  }
h1:hover{
  color:red;
}
span{
  color:blue;
  font-weight: bold;
}
span:hover{
  font-weight: bold;
}
.rt{
  margin-left: 100px;
}
`;

  export const Home = () => {
    const { loading, data, error } = useSelector((store) => store.data); 
    const dispatch = useDispatch();
    useEffect(() => {
      getDatas();
    }, []);

    const getDatas = () => {
        dispatch(getDataLoading());
        axios.get("http://localhost:3001/data").then(({ data }) => {
          dispatch(getDataSuccess(data));
        });
      };
     

      let handleRemove = (e) => {
        axios.delete(`http://localhost:3001/data/${e.id}`)
            .then((res) => {
              getDatas()
            
            })
            .catch((err) => {
               console.log(err);
            })
    }

      return (
        <div>
          <h1>Home Page</h1>
          <Link style={{"font-weight":"bold", "fontSize":"22px"}} to={"/add-country"}>Add a new country</Link>
          <Link style={{"font-weight":"bold", "fontSize":"22px","marginLeft":"10px"}} className="rt" to={"/add-city"}>Add a new city</Link>
         <ResultDiv>
         
          <div className="box1">
            <h1>Data List</h1>
            <button onClick={() => {
                 var arr=data.sort((a, b) => {
                    return +(a.population) - (+b.population);
                  })
                  // console.log(arr);
                  dispatch(getDataSuccess(arr))
                }}>Population Low to High</button>
            <button onClick={() => {
                 var arr1=data.sort((a, b) => {
                    return (+b.population) - (+a.population);
                  })
                  // console.log(arr1);
                  dispatch(getDataSuccess(arr1))
                }}>Population High to Low</button>
            <table className="table" border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>City</th>
            <th>Population
            
            </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead> 
        <tbody>
          {data.map((citys, index) => { 
            return (
              <tr key={citys.id}>
                <td>{citys.id}</td>
                <td>{citys.country}</td>
                <td>{citys.city}</td>
                <td>{citys.population}</td>
                <td>
                <button className="bt" id="btn1" onClick={() => {
             
            }}><Link to={`/data/${citys.id}/edit`}>Edit</Link></button>
                </td>
                <td>
                <button className="bt" id="btn3" onClick={() => {
              handleRemove(citys)
        }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
          </div>
          </ResultDiv>
        </div>
      );
    };