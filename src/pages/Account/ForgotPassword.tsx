import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../Api/authApi";
import apiResponse from "../../Interfaces/apiResponse";
import Header from "../../components/Header";

export type SignFormData = {
  email: string;
};
const ForgotPassword = () => {

  const [forgotPaaword] = useForgotPasswordMutation();

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormData>();

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
  const token = generateToken();

  const onSubmit = handleSubmit(async (data) => {   
    try {
      const response: apiResponse = await forgotPaaword({
        email:data.email        
      });
      if (response.error.originalStatus === 200) {        
        navigate(`/accountrecoveryconfirmation?token=${token}`);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Fetch error:", error);
    }   
  });

  return (
    <>   
    
   <Header/>
    <form className=" py-5  flex flex-col items-center" onSubmit={onSubmit}>
      <h1 className="text-lg font-bold" style={{ marginRight: "200px" }}>
      Forgot your password?
      </h1>
      <p className="text-sm mb-8" style={{ marginRight: "56px" }}>
      No problem! We'll send you a link to reset it. Enter the <br/> email address you use to sign in to Booking.com.
      </p>

      <label className="text-left mr-64 font-semibold">Your email address</label>
      <input
        className="w-96 focus:border-blue-600 focus:border-2 rounded px-2 my-2 border border-zinc-700 h-10 outline-none"
        type="email"
        placeholder="Enter your password"
        {...register("email", {
          required: "Enter your email address",
          
        })}
      ></input>
      {errors.email && (
          <span className="text-red-500 mr-56 text-sm">
            {errors.email.message}
          </span>
        )}
      <button className="border-stone-700 bg-blue-600 hover:bg-blue-900 text-white w-96 rounded h-12 text-center my-2 py-3">
        Send reset link
      </button>
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
export default ForgotPassword;
