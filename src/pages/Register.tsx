import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      {/* Header */}
      <div className="bg-blue-800 py-4">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white font-semibold tracking-tight">
            <Link to="/">Booking.com</Link>
          </span>
          <span className="flex space-x-2">
            <Link
              to="/register"
              className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
            >
              Register
            </Link>
            <Link
              to="/signin"
              className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
      {/* Registration form */}
      <form className="py-5  flex flex-col items-center" onSubmit={onSubmit}>
        <h1 className="text-lg font-bold" style={{ marginRight: "240px" }}>
          Create password
        </h1>
        <p className="text-sm mb-10 mr-14">
          Use a minimum of 10 characters, including uppercase <br />
          letters, lowercase letters, and numbers.
        </p>

        <label className="text-left mr-80 font-semibold">Password</label>
        <input
          type="password"
          className="w-96 focus:border-blue-600 focus:border-2 rounded h-9 px-2 my-2 border border-zinc-700 h-10 outline-none"
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
          className="w-96 focus:border-blue-600 focus:border-2 rounded h-9 px-2 my-2 border border-zinc-700 h-10 outline-none"
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
