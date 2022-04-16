import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { editDataLoading, editDataSuccess } from "../redux/actions";

export const EditDatas=()=>{
    const { loading } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
    let { id } = useParams();
    useEffect(()=>{
    axios.get(`http://localhost:3001/data/${id}`).then((res)=>{
        // console.log(res)
       setData(res.data);
    })
    },[])

    function handleChange(e) {
        let key = e.target.name;
        let inputData = {};
        if (key != "check") {

          inputData = {
            ...newData,
            [key]:e.target.value,
          };
        } else {
          inputData = {
            ...newData,
            [key]:e.target.value,
          };
        }
    
        setNewData(inputData);
      }

      function handleSave(e) {
       e.preventDefault();
        dispatch(editDataLoading());
        axios({
          method: "patch",
          url: `http://localhost:3001/data/${id}`,
          data: {
            id: data.id,
            country: newData.country || data.country,
            city: newData.city || data.city,
            population: newData.population || data.population,
          },
        }).then((res) => {
          dispatch(editDataSuccess());
          
        });
      }
return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h3>Edit yout list</h3>
      <form onSubmit={handleSave}>
      <input type="text" name="country" defaultValue={data.country} placeholder="Country" onChange={handleChange} />
         <input type="text" name="city" defaultValue={data.city}  placeholder="City" onChange={handleChange} />
         <input type="number" name="population" defaultValue={data.population} placeholder="Population" onChange={handleChange} />
         <input type="submit" value="Save" />
      
      <input type="checkbox" id="check" onChange={handleChange} name="check" />
      <label htmlFor="check">Completed</label>
      </form>
      <button>
        <Link to={"/"}>Return to Home</Link>
      </button>
    </div>
  );
};