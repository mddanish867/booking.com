import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Api/authApi";
import apiResponse from "../../Interfaces/apiResponse";
import Header from "../../components/Header";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [isLoggedInUser] = useRegisterMutation();
  const navigate = useNavigate(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email'); 
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit(async(data) => { 
    try {
      const response : apiResponse = await isLoggedInUser({
        email: email,
        password: data.password
      });      
      if (response.data) {        
        navigate("/signin");
      } else {
        // Proceed with registration
        //toastNotify("Registration successful! Please login to continue!");
        navigate(`/register?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Fetch error:', error);      
    }
  });

  return (
    <>
      {/* Header */}
      <Header/>
      {/* Registration form */}
      <form className="py-5  flex flex-col items-center" onSubmit={onSubmit}>
        <h1 className="text-lg font-bold" style={{ marginRight: "247px" }}>
          Create password
        </h1>
        <p className="text-sm mr-14">
          Use a minimum of 10 characters, including uppercase <br />
          letters, lowercase letters, and numbers.
        </p>
        <p className="text-sm font-bold mb-8" style={{ marginRight: "211px" }}>{email}</p>

        <label className="text-left mr-80 font-semibold">Password</label>
        <input
          type="password"
          className="w-96 focus:border-blue-600 focus:border-2 rounded px-2 my-2 border border-zinc-700 h-10 outline-none"
          placeholder="Enter a password"
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

        <label className="text-left mr-64 font-semibold">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-96 focus:border-blue-600 focus:border-2 rounded px-2 my-2 border border-zinc-700 h-10 outline-none"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Confirm your password";
              } else if (watch("password") !== val) {
                return "The passwords you entered didn't match – try again";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500 mr-60 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="border-stone-700 bg-blue-600 hover:bg-blue-900 text-white w-96 rounded h-12 text-center my-2 py-3">
          Create account
        </button>

        <hr className="text-gray-800"></hr>
        <span className="text-xs items-center mt-10">
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
      </form>
    </>
  );
};

export default Register;
