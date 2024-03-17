import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <div className="bg-blue-800 py-4">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white font-semibold tracking-tight">
            <Link to="/">Booking.com</Link>
          </span>
          <span className="flex space-x-2">
            <Link
              to="/signup"
              className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
            >
              Register
            </Link>
            <Link
              to="/signup"
              className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
      <div className=" py-5  flex flex-col items-center">
        <h1
          className="text-lg mb-10 font-bold"
          style={{ marginRight: "145px" }}
        >
          Sign in or Create an account
        </h1>
        <label className="text-left mr-72 font-semibold">Email address</label>
        <input
          className="w-96 focus:border-blue-600 focus:border-2 rounded h-9 px-2 my-2 border border-zinc-700 h-10 outline-none"
          type="text"
          placeholder="Enter your email address"
        ></input>
        <Link
          className="border-stone-700 bg-blue-600 hover:bg-blue-900 text-white w-96 rounded h-12 text-center my-2 py-3"
          to=""
        >
          Continue with email
        </Link>
        <span className="mb-8">or use one of these options</span>
        <div className="flex flex-row">
          <Link
            to=""
            className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
          >
            FB
          </Link>
          <Link
            to=""
            className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
          >
            G+
          </Link>
          <Link
            to=""
            className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
          >
            AP
          </Link>
        </div>
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
      </div>
    </>
  );
};
export default Signin;
