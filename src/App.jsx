import './App.css';
import {Home} from "./components/Home";
import {Routes, Route} from "react-router-dom";
import { EditDatas } from './components/EditData';
import { AddData } from './components/AddData';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path={"/"} element={<Home />}></Route>
       <Route path={"/data/:id/edit"} element={<EditDatas />}></Route>
       <Route path={"add-city"} element={<AddData />}></Route>
     </Routes>
    </div>
  );
}
export default App;

