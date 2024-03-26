import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRestPasswordMutation } from "../../Api/authApi";
import apiResponse from "../../Interfaces/apiResponse";
import Header from "../../components/Header";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [resetPaaword] = useRestPasswordMutation();
  const navigate = useNavigate();
  console.log(email);
  console.log(token);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response: apiResponse = await resetPaaword({
        email:email,
        newPassword:data.password,
        resetPasswordToken:token        
      });
      if (response.error.originalStatus === 200) {        
        navigate(`/signin?token=${(token)}`);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Fetch error:", error);
    }
  });

  return (
    <>
      {/* Header */}
      <Header/>
      {/* Registration form */}
      <form className="py-5  flex flex-col items-center" onSubmit={onSubmit}>
        <h1 className="text-lg font-bold" style={{ marginRight: "193px" }}>
          Create a new password
        </h1>
        <p className="text-sm mb-10 mr-14">
          Use a minimum of 10 characters, including uppercase <br />
          letters, lowercase letters, and numbers.
        </p>

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
          Set new password
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

export default ResetPassword;
