import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Pages/Home";
import StartFundraiser from "./Pages/StartFundraiser";
import Medical from "./Pages/Medical";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/Signup";
import Details from "./Pages/Details";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
             <Route path='/SignIn' element={<SignIn/>}></Route>
              <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path='/Medical' element={<Medical/>}></Route>
          <Route path='/StartFundraiser' element={<StartFundraiser />}> </Route>
       
              <Route path='/Details/:id' element={<Details/>}></Route>
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
