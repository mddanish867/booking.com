import { Link, useLocation, useNavigate } from "react-router-dom";

function AccountRecoveryConfirmation() {
    const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  return (
    <>
      <div className="bg-blue-800 py-4">
        <div className="mx-auto flex justify-between">
          <span className="text-2xl text-white font-semibold tracking-tight mx-20">
            <Link to="/">Booking.com</Link>
          </span>
        </div>
      </div>
      <form className=" py-5  flex flex-col items-center">
        <h1 className="text-lg font-bold mb-4" style={{ marginRight: "234px" }}>
          Check your inbox
        </h1>
        <p className="text-sm mb-3" style={{ marginRight: "30px" }}>
          We've just emailed instructions and a reset password link <br/> to <b>{email}</b>.
          It might take a few <br/> minutes to arrive.
        </p>
        <button className="border border-blue-600 text-bold text-blue-800 w-96 rounded h-12 text-center my-2 py-3"
        onClick={() => navigate("/signin")}
        >
          Back to sign-in
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
}

export default AccountRecoveryConfirmation;
