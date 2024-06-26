import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import SignIn from "./pages/Account/SignIn";
import Register from "./pages/Account/Register";
import SignIn2 from "./pages/Account/SignIn2";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ResetPassword from "./pages/Account/ResetPassword";
import AccountRecoveryConfirmation from "./pages/Account/AccountRecoveryConfirmation";
import DetailsSection from "./Forms/ManageHotelForm/DetailsSection";
import AddHotel from "./pages/AddHotel";
import LoggedInPopup from "./pages/Account/LogedInPopup";
import { useEffect, useState } from "react";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import Cookies from 'js-cookie';


function App() {   
 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    //const token = sessionStorage.getItem("jwtToken");
    if (token !== null) {
      setIsLoggedIn(token);
    } else {
      setIsLoggedIn(undefined);
      setIsDialogOpen(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
 
  return (
    <>
      <BrowserRouter>
      {isDialogOpen && <LoggedInPopup open={isDialogOpen} onClose={handleCloseDialog} />} {/* Pass both open and onClose props */}

        <Routes>
          <Route path="/" element={<Layout><p>Home</p></Layout>}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin2" element={<SignIn2 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accountrecoveryconfirmation" element={<AccountRecoveryConfirmation />}/>
          <Route path="/addhotel" element={<AddHotel />} />
          <Route path="/detailssection" element={<DetailsSection />} />
          <Route path="/myhotels" element={<MyHotels />} />
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />}/>
          <Route path="/searchresults" element={<Search />}/>
          <Route path="/detail/:hotelId" element={<Detail />}/>
          {isLoggedIn && (
            <>
            <Route
              path="/hotel/:hotelId/booking"
              element={                
                  <Booking />                
              }
            />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
