import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import SignIn from "./pages/Account/SignIn";
import Register from "./pages/Account/Register";
import SignIn2 from "./pages/Account/SignIn2";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ResetPassword from "./pages/Account/ResetPassword";
import AccountRecoveryConfirmation from "./pages/Account/AccountRecoveryConfirmation";
import ManageHotelForm from "./Forms/ManageHotelForm/ManageHotelForm";

function App() { 

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home</p>
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={           
              <SignIn />            
          }
        />
        <Route
          path="/signin2"
          element={           
              <SignIn2 />            
          }
        />
        <Route
          path="/forgotpassword"
          element={           
              <ForgotPassword />            
          }
        />
         <Route
          path="/resetpassword"
          element={           
              <ResetPassword />            
          }
        />
        <Route
          path="/register"
          element={            
              <Register />            
          }
        />
        <Route
          path="/accountrecoveryconfirmation"
          element={            
              <AccountRecoveryConfirmation />            
          }
        />
        <Route
          path="/managehotelform"
          element={            
              <ManageHotelForm />            
          }
        />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
