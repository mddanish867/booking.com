import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

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
          path="/register"
          element={            
              <Register />            
          }
        />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
