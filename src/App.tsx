import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Pages/Home";
import StartFundraiser from "./Pages/StartFundraiser";
import Medical from "./Pages/Medical";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/Signup";
import Details from "./Pages/Details";
import About from "./Pages/About";
import Verification from "./Components/StartFunding/Verification";

import Educational from "./Pages/Educational";
import Others from './Pages/Others'

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
     
      
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
             <Route path='/signIn' element={<SignIn/>} />
               <Route path='/signUp' element={<SignUp/>} />
          <Route path='/medical' element={<Medical/>} />
          
          <Route path='/educational' element={<Educational />} />
           
          <Route path='/others' element={<Others/>} />
        
          
           <Route path='/review-ongoing' element={<Verification/>} />
          <Route path='/startfundraiser' element={<StartFundraiser />}>
            
          </Route>
          <Route path='/about-us' element={<About />} />
          <Route path='/details/:id' element={<Details/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
