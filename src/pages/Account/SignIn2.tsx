import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../Api/authApi";
import apiResponse from "../../Interfaces/apiResponse";
import Header from "../../components/Header";
import toastNotify from "../../Helper/toastNotify";
import "react-toastify/dist/ReactToastify.css";

export type SignFormData = {
  password: string;
};
export interface RouteParams {
  email: string;
}
const signIn2 = () => {
  const [loggedInUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

    // generate token
    function generateToken(): string {
      // Generate a UUID
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    
      // Remove hyphens from the UUID
      const token = uuid.replace(/-/g, '');
    
      return token;
    }
     // Example usage
     const returnToken = generateToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response: apiResponse = await loggedInUser({
        email: email,
        password: data.password,
      });
      if (response.data) {
        // Extract JWT token from the response
        const jwtToken = response.data.jwtToken;
        const userId = response.data.user_id;
       
        // Set JWT token in a cookie
        document.cookie = `jwtToken=${jwtToken}; Secure; SameSite=None;`;
        document.cookie = `user-id=${userId}; Secure; SameSite=None;`;

        toastNotify("Successfully logged in!", "success");
        // this logic will navigate back to the page from where you are coming
        navigate(-2 || `/?token=${returnToken}`);
      }
      else{
        toastNotify("Email or password incorrect!", "error");
      }
    } catch (error) {
      
      // Handle fetch error
      console.error("Fetch error:", error);
    }
  });

  return (
    <>
      <Header/>
      <form className=" py-5  flex flex-col items-center " onSubmit={onSubmit}>
        <h1 className="text-lg font-bold" style={{ marginRight: "211px" }}>
          Enter your password
        </h1>
        <p className="text-sm" style={{ marginRight: "184px" }}>
          Enter Booking.com password for
        </p>
        <p className="text-sm font-bold mb-8" style={{ marginRight: "211px" }}>
          {email}
        </p>

        <label className="text-left mr-80 font-semibold">Password</label>
        <input
          className="w-96 focus:border-blue-600 focus:border-2 rounded px-2 my-2 border border-zinc-700 h-10 outline-none sm:items-center"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Enter your Booking.com password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 mr-44 text-sm">
            {errors.password.message}
          </span>
        )}         
        <button className="border-stone-700 bg-blue-600 hover:bg-blue-900 text-white w-96 rounded h-12 text-center my-2 py-3">
          Sign in
        </button>
        <span>or</span>
        <Link
          className="hover:bg-blue-100 hover:border hover:border-blue-600 border border-blue-600 text-blue-600 w-96 rounded h-12 text-center my-2 py-3"
          to="/resetpassword"
        >
          Sign in with verification Link
        </Link>
        <Link
          className=" hover:bg-blue-100 text-blue-600 w-96 rounded h-9 text-center my-3 py-1"
          to="/forgotpassword"
        >
          Forgot your passward?
        </Link>
      </form>

      <div className="flex flex-col items-center">
        <hr className="text-gray-800"></hr>
        <span className="text-xs items-center mt-2">
          By signing in or creating an account, you agree with our{" "}
          <a href="#" className="text-blue-600">
            Terms & <br />
            Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600">
            Privacy Statement
          </a>
        </span>
        <span className="text-xs items-center mt-5">All rights reserved</span>
        <span className="text-xs items-center mt-1">
          Copyright (2006-2024) - Booking.com™
        </span>
      </div>
    </>
  );
};
export default signIn2;
