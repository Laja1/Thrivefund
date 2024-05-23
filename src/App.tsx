import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Pages/Home";
import StartFundraiser from "./Pages/StartFundraiser";
import Medical from "./Pages/Medical";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path='/Medical' element={<Medical/>}></Route>
          <Route path='/StartFundraiser' element={<StartFundraiser />}>
            
            {/* <Route path='/PersonalInformation' element={<PersonalInformation />}></Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
