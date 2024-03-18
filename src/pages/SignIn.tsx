import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type SignFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signin = () => {
  const [submission, setSubmission] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormData>();

  const onSubmit = handleSubmit((data) => {
    setSubmission(true);
    console.log(data);
  });

  // Continue with email
  const handleOnClick = () => {
    if (submission) {
      navigate("./Signin2");
    }
  };
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
        <>
          <h1
            className="text-lg mb-10 font-bold"
            style={{ marginRight: "145px" }}
          >
            Sign in or Create an account
          </h1>
          <label className="text-left mr-72 font-semibold">Email address</label>
          <input
            className="w-96 focus:border-blue-600 focus:border-2 rounded h-9 px-2 my-2 border border-zinc-700 h-10 outline-none"
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: "Enter your email address" })}
          ></input>
          {errors.email && (
            <span className="text-red-500 mr-60 text-sm">
              {errors.email.message}
            </span>
          )}
          <button
            className="border-stone-700 bg-blue-600 hover:bg-blue-900 text-white w-96 rounded h-12 text-center my-2 py-3"
            onClick={handleOnClick}
          >
            Continue with email
          </button>
          <span className="mb-8">or use one of these options</span>
          <div className="flex flex-row">
            <Link
              to=""
              className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-7"
                width="24"
                height="25"
                viewBox="0 0 72 72"
                id="facebook"
              >
                <g fill="none" fill-rule="evenodd">
                  <g>
                    <rect width="72" height="72" fill="#385084" rx="4"></rect>
                    <path
                      fill="#FFF"
                      d="M49.679 72V43.73h9.359l1.401-11.017h-10.76V25.68c0-3.19.873-5.363 5.385-5.363l5.754-.003V10.46c-.995-.134-4.41-.435-8.384-.435-8.297 0-13.977 5.135-13.977 14.564v8.124h-9.382v11.018h9.382V72H49.68z"
                    ></path>
                  </g>
                </g>
              </svg>
            </Link>
            <Link
              to=""
              className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-7"
                width="24"
                height="25"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>{" "}
            </Link>
            <Link
              to=""
              className="mx-4 rounded border border-gray-300 h-16 w-20 outline-none hover:border-blue-600 text-center py-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-7"
                width="28"
                height="30"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                id="apple"
              >
                <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44a4.51,4.51,0,0,1,2.16-3.81,4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z"></path>
              </svg>
            </Link>
          </div>
        </>

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
export default Signin;
