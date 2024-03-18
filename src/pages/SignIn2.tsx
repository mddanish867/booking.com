import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export type SignFormData = {
  password: string;
};
const signIn2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>   
    
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
    <form className=" py-5  flex flex-col items-center" onSubmit={onSubmit}>
      <h1 className="text-lg font-bold" style={{ marginRight: "211px" }}>
        Enter your password
      </h1>
      <p className="text-sm mb-8" style={{ marginRight: "184px" }}>
        Enter Booking.com password for
      </p>

      <label className="text-left mr-80 font-semibold">Password</label>
      <input
        className="w-96 focus:border-blue-600 focus:border-2 rounded h-9 px-2 my-2 border border-zinc-700 h-10 outline-none"
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Enter your Booking.com password",
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
        className="border-stone-700 hover:bg-blue-100 hover:border hover:border-blue-600 border border-blue-600 text-blue-600 w-96 rounded h-12 text-center my-2 py-3"
        to=""
      >
        Sign in with verification Link
      </Link>
      <Link
        className=" hover:bg-blue-100 text-blue-600 w-96 rounded h-9 text-center my-3 py-1"
        to=""
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
